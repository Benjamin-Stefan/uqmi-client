// src/utils/ssh.ts
import { Client } from "ssh2";
import { promises as fs } from "fs";
import { once } from "events";
async function createSSHConnection(options) {
  const conn = new Client();
  const connectOptions = {
    host: options.host,
    port: options.port || 22,
    username: options.username,
    readyTimeout: 2e4
  };
  if (options.password) {
    connectOptions.password = options.password;
  } else if (options.privateKeyPath) {
    try {
      connectOptions.privateKey = await fs.readFile(options.privateKeyPath);
    } catch (error) {
      throw new Error(`Error loading private key: ${error.message}`);
    }
    if (options.passphrase) {
      connectOptions.passphrase = options.passphrase;
    }
  } else {
    throw new Error("Password or private key must be provided.");
  }
  conn.connect(connectOptions);
  await once(conn, "ready");
  return conn;
}
async function executeCommand(conn, command) {
  const stream = await new Promise((resolve, reject) => {
    conn.exec(command, (err, stream2) => {
      if (err) {
        return reject(new Error(`Command execution failed: ${err.message}`));
      }
      resolve(stream2);
    });
  });
  let stdout = "";
  let stderr = "";
  stream.on("data", (data) => {
    stdout += data.toString();
  });
  stream.stderr.on("data", (data) => {
    stderr += data.toString();
  });
  await once(stream, "close");
  if (stderr) {
    throw new Error(`Command execution failed with error: ${stderr}`);
  }
  return stdout;
}
async function runSSHCommand(command, options) {
  const conn = await createSSHConnection(options);
  try {
    return await executeCommand(conn, command);
  } finally {
    conn.end();
  }
}

// src/uqmiClient.ts
var UqmiClient = class {
  /**
   * Creates an instance of UqmiClient.
   * @param {string} device - The device identifier.
   * @param {SSHOptions} sshOptions - SSH options for connection.
   * @param {UqmiClientOptions} [uqmiClientOptions] - Optional UqmiClient options.
   * @throws {Error} If the device is not specified.
   */
  constructor(device, sshOptions, uqmiClientOptions) {
    if (!device) {
      throw new Error("Device must be specified");
    }
    this.device = device;
    this.sshOptions = sshOptions;
    this.uqmiClientOptions = {
      timeout: 1e4
      // Default timeout
    };
    if (uqmiClientOptions) {
      this.uqmiClientOptions = {
        ...this.uqmiClientOptions,
        ...Object.fromEntries(Object.entries(uqmiClientOptions).filter(([, value]) => value !== null && value !== void 0))
      };
    }
  }
  /**
   * Escapes shell arguments to prevent command injection.
   * This function escapes dangerous characters and ensures that inputs are safe.
   * @param {string} arg - The argument to escape.
   * @returns {string} The escaped argument.
   */
  escapeShellArg(arg) {
    return `'${arg.replace(/'/g, `'\\''`)}'`;
  }
  /**
   * Executes a uqmi command via SSH.
   * @protected
   * @param {string} command - The uqmi command to execute.
   * @returns {Promise<string>} The trimmed stdout response from the command.
   * @throws {Error} If the command execution fails.
   */
  async runCommand(args) {
    try {
      if (this.uqmiClientOptions.timeout) {
        args.unshift(`${this.uqmiClientOptions.timeout}`);
        args.unshift(`--timeout`);
      }
      args.unshift(`--device=${this.device}`);
      const escapedArgs = args.map((arg) => this.escapeShellArg(arg)).join(" ");
      const stdout = await runSSHCommand(`uqmi ${escapedArgs}`, this.sshOptions);
      return stdout.trim();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error executing uqmi command: ${error}`);
      }
      throw error;
    }
  }
  /**
   * Retrieves the service versions.
   * @returns {Promise<string>} The service versions.
   */
  async getVersions() {
    return this.runCommand(["--get-versions"]);
  }
  /**
   * Sets the client ID for a specific service.
   * @param {string} serviceName - The name of the service.
   * @param {string} clientId - The client ID to set.
   * @returns {Promise<string>} Confirmation of the command execution.
   */
  async setClientId(serviceName, clientId) {
    return this.runCommand([`--set-client-id ${serviceName},${clientId}`]);
  }
  /**
   * Retrieves the client ID for a specific service.
   * @param {string} serviceName - The name of the service.
   * @returns {Promise<string>} The client ID.
   */
  async getClientId(serviceName) {
    return this.runCommand([`--get-client-id ${serviceName}`]);
  }
  /**
   * Synchronizes all client IDs.
   * @returns {Promise<string>} Confirmation of the synchronization.
   */
  async sync() {
    return this.runCommand(["--sync"]);
  }
  /**
   * Starts the network connection with the specified parameters.
   * @param {string} apn - The APN (Access Point Name) to use.
   * @param {"pap" | "chap" | "both" | "none"} authType - The authentication type.
   * @param {string} [username] - Optional username for authentication.
   * @param {string} [password] - Optional password for authentication.
   * @param {"ipv4" | "ipv6" | "unspecified"} [ipFamily="unspecified"] - The IP family to use.
   * @returns {Promise<string>} Confirmation of the network start.
   */
  async startNetwork(apn, authType, username, password, ipFamily = "unspecified") {
    const args = [`--start-network`, `--apn=${apn}`, `--auth-type=${authType}`, `--ip-family=${ipFamily}`];
    if (username) args.push(`--username=${username}`);
    if (password) args.push(`--password=${password}`);
    return this.runCommand(args);
  }
  /**
   * Stops the network connection.
   * @param {string} pdh - The PDH (Packet Data Handler).
   * @param {boolean} [autoconnect=false] - Whether to enable autoconnect after stopping.
   * @returns {Promise<string>} Confirmation of the network stop.
   */
  async stopNetwork(pdh, autoconnect = false) {
    let args = [`--stop-network ${pdh}`];
    if (autoconnect) args.push(` --autoconnect`);
    return this.runCommand(args);
  }
  /**
   * Retrieves the current data status.
   * @returns {Promise<string>} The current data status.
   */
  async getDataStatus() {
    return this.runCommand(["--get-data-status"]);
  }
  /**
   * Sets the IP family.
   * @param {"ipv4" | "ipv6" | "unspecified"} ipFamily - The IP family to set.
   * @returns {Promise<string>} Confirmation of the IP family change.
   */
  async setIPFamily(ipFamily) {
    return this.runCommand([`--set-ip-family ${ipFamily}`]);
  }
  /**
   * Sets the autoconnect feature.
   * @param {"disabled" | "enabled" | "paused"} value - The autoconnect state to set.
   * @returns {Promise<string>} Confirmation of the autoconnect state change.
   */
  async setAutoconnect(value) {
    return this.runCommand([`--set-autoconnect ${value}`]);
  }
  /**
   * Retrieves the current network settings.
   * @returns {Promise<string>} The current network settings.
   */
  async getCurrentSettings() {
    return this.runCommand(["--get-current-settings"]);
  }
  /**
   * Retrieves the device capabilities.
   * @returns {Promise<string>} The device capabilities.
   */
  async getCapabilities() {
    return this.runCommand(["--get-capabilities"]);
  }
  /**
   * Retrieves the PIN status.
   * @returns {Promise<string>} The PIN status.
   */
  async getPinStatus() {
    return this.runCommand(["--get-pin-status"]);
  }
  /**
   * Verifies PIN1.
   * @param {string} pin - The PIN1 to verify.
   * @returns {Promise<string>} Confirmation of the PIN1 verification.
   */
  async verifyPin1(pin) {
    return this.runCommand([`--verify-pin1 ${pin}`]);
  }
  /**
   * Verifies PIN2.
   * @param {string} pin - The PIN2 to verify.
   * @returns {Promise<string>} Confirmation of the PIN2 verification.
   */
  async verifyPin2(pin) {
    return this.runCommand([`--verify-pin2 ${pin}`]);
  }
  /**
   * Sets the protection for PIN1.
   * @param {"enabled" | "disabled"} state - The protection state for PIN1.
   * @param {string} pin - The PIN1 to protect.
   * @returns {Promise<string>} Confirmation of the PIN1 protection change.
   */
  async setPin1Protection(state, pin) {
    return this.runCommand([`--set-pin1-protection ${state}`, `--pin ${pin}`]);
  }
  /**
   * Sets the protection for PIN2.
   * @param {"enabled" | "disabled"} state - The protection state for PIN2.
   * @param {string} pin2 - The PIN2 to protect.
   * @returns {Promise<string>} Confirmation of the PIN2 protection change.
   */
  async setPin2Protection(state, pin2) {
    return this.runCommand([`--set-pin2-protection ${state}`, `--pin ${pin2}`]);
  }
  /**
   * Changes PIN1.
   * @param {string} oldPin - The old PIN1.
   * @param {string} newPin - The new PIN1.
   * @returns {Promise<string>} Confirmation of the PIN1 change.
   */
  async changePin1(oldPin, newPin) {
    return this.runCommand([`--change-pin1`, `--pin ${oldPin}`, `--new-pin ${newPin}`]);
  }
  /**
   * Changes PIN2.
   * @param {string} oldPin - The old PIN2.
   * @param {string} newPin - The new PIN2.
   * @returns {Promise<string>} Confirmation of the PIN2 change.
   */
  async changePin2(oldPin, newPin) {
    return this.runCommand([`--change-pin2`, `--pin ${oldPin}`, `--new-pin ${newPin}`]);
  }
  /**
   * Unblocks PIN1 using PUK.
   * @param {string} puk - The PUK to unblock PIN1.
   * @param {string} newPin - The new PIN1 to set.
   * @returns {Promise<string>} Confirmation of the PIN1 unblock.
   */
  async unblockPin1(puk, newPin) {
    return this.runCommand([`--unblock-pin1`, `--puk ${puk}`, `--new-pin ${newPin}`]);
  }
  /**
   * Unblocks PIN2 using PUK.
   * @param {string} puk - The PUK to unblock PIN2.
   * @param {string} newPin - The new PIN2 to set.
   * @returns {Promise<string>} Confirmation of the PIN2 unblock.
   */
  async unblockPin2(puk, newPin) {
    return this.runCommand([`--unblock-pin2`, `--puk ${puk}`, `--new-pin ${newPin}`]);
  }
  /**
   * Retrieves the ICCID (Integrated Circuit Card Identifier).
   * @returns {Promise<string>} The ICCID.
   */
  async getICCID() {
    return this.runCommand(["--get-iccid"]);
  }
  /**
   * Retrieves the IMSI (International Mobile Subscriber Identity).
   * @returns {Promise<string>} The IMSI.
   */
  async getIMSI() {
    return this.runCommand(["--get-imsi"]);
  }
  /**
   * Retrieves the IMEI (International Mobile Equipment Identity).
   * @returns {Promise<string>} The IMEI.
   */
  async getIMEI() {
    return this.runCommand(["--get-imei"]);
  }
  /**
   * Retrieves the MSISDN (Mobile Station International Subscriber Directory Number).
   * @returns {Promise<string>} The MSISDN.
   */
  async getMSISDN() {
    return this.runCommand(["--get-msisdn"]);
  }
  /**
   * Resets the DMS service.
   * @returns {Promise<string>} Confirmation of the DMS reset.
   */
  async resetDMS() {
    return this.runCommand(["--reset-dms"]);
  }
  /**
   * Retrieves the current device operating mode.
   * @returns {Promise<string>} The device operating mode.
   */
  async getDeviceOperatingMode() {
    return this.runCommand(["--get-device-operating-mode"]);
  }
  /**
   * Sets the device operating mode.
   * @param {"online" | "low_power" | "factory_test" | "offline" | "reset" | "shutting_down" | "persistent_low_power" | "mode_only_low_power"} mode - The mode to set.
   * @returns {Promise<string>} Confirmation of the mode change.
   */
  async setDeviceOperatingMode(mode) {
    return this.runCommand([`--set-device-operating-mode ${mode}`]);
  }
  /**
   * Executes FCC authorization.
   * @returns {Promise<string>} Confirmation of the FCC authorization.
   */
  async setFCCAuth() {
    return this.runCommand(["--fcc-auth"]);
  }
  /**
   * Verifies PIN1 for new devices.
   * @param {string} pin - The PIN1 to verify.
   * @returns {Promise<string>} Confirmation of the PIN1 verification.
   */
  async uimVerifyPin1(pin) {
    return this.runCommand([`--uim-verify-pin1 ${pin}`]);
  }
  /**
   * Verifies PIN2 for new devices.
   * @param {string} pin - The PIN2 to verify.
   * @returns {Promise<string>} Confirmation of the PIN2 verification.
   */
  async uimVerifyPin2(pin) {
    return this.runCommand([`--uim-verify-pin2 ${pin}`]);
  }
  /**
   * Retrieves the SIM card state.
   * @returns {Promise<string>} The SIM state.
   */
  async getSIMState() {
    return this.runCommand(["--uim-get-sim-state"]);
  }
  /**
   * Sets the network modes.
   * @param {string[]} modes - The network modes to set.
   * @returns {Promise<string>} Confirmation of the network mode setting.
   */
  async setNetworkModes(modes) {
    const modeString = modes.join(",");
    return this.runCommand([`--set-network-modes ${modeString}`]);
  }
  /**
   * Performs a network scan.
   * @returns {Promise<string>} The results of the network scan.
   */
  async networkScan() {
    return this.runCommand(["--network-scan"]);
  }
  /**
   * Initiates network registration.
   * @returns {Promise<string>} Confirmation of the network registration.
   */
  async networkRegister() {
    return this.runCommand(["--network-register"]);
  }
  /**
   * Sets the PLMN (Public Land Mobile Network).
   * @param {string} mcc - The Mobile Country Code.
   * @param {string} mnc - The Mobile Network Code.
   * @returns {Promise<string>} Confirmation of the PLMN setting.
   */
  async setPLMN(mcc, mnc) {
    return this.runCommand([`--set-plmn`, `--mcc ${mcc}`, `--mnc ${mnc}`]);
  }
  /**
   * Retrieves the PLMN (Public Land Mobile Network).
   * @returns {Promise<string>} The PLMN information.
   */
  async getPLMN() {
    return this.runCommand(["--get-plmn"]);
  }
  /**
   * Retrieves signal information.
   * @returns {Promise<string>} The signal information.
   */
  async getSignalInfo() {
    return this.runCommand(["--get-signal-info"]);
  }
  /**
   * Lists SMS messages.
   * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
   * @returns {Promise<string>} The list of SMS messages.
   */
  async listMessages(storage = "sim") {
    return this.runCommand([`--list-messages`, `--storage ${storage}`]);
  }
  /**
   * Deletes an SMS message.
   * @param {number} id - The ID of the SMS message to delete.
   * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
   * @returns {Promise<string>} Confirmation of the SMS deletion.
   */
  async deleteMessage(id, storage = "sim") {
    return this.runCommand([`--delete-message ${id}`, `--storage ${storage}`]);
  }
  /**
   * Retrieves an SMS message.
   * @param {number} id - The ID of the SMS message to retrieve.
   * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
   * @returns {Promise<string>} The content of the SMS message.
   */
  async getMessage(id, storage = "sim") {
    return this.runCommand([`--get-message ${id}`, `--storage ${storage}`]);
  }
  /**
   * Retrieves the raw content of an SMS message.
   * @param {number} id - The ID of the SMS message to retrieve.
   * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
   * @returns {Promise<string>} The raw content of the SMS message.
   */
  async getRawMessage(id, storage = "sim") {
    return this.runCommand([`--get-raw-message ${id}`, `--storage ${storage}`]);
  }
  /**
   * Sends an SMS message.
   * @param {string} destinationNumber - The destination phone number.
   * @param {string} message - The content of the SMS message.
   * @param {boolean} [flash=false] - Whether to send the SMS as a flash message.
   * @param {string} [smsc] - The SMS service center number.
   * @returns {Promise<string>} Confirmation of the SMS sending.
   */
  async sendMessage(destinationNumber, message, flash = false, smsc) {
    let args = [`--send-message ${message}`, `--send-message-target ${destinationNumber}`];
    if (flash) args.push(" --send-message-flash");
    if (smsc) args.push(` --send-message-smsc ${smsc}`);
    return this.runCommand(args);
  }
  /**
   * Sets the data format.
   * @param {"802.3" | "raw-ip"} type - The data format to set.
   * @returns {Promise<string>} Confirmation of the data format setting.
   */
  async setDataFormat(type) {
    return this.runCommand([`--wda-set-data-format ${type}`]);
  }
  /**
   * Retrieves the data format.
   * @returns {Promise<string>} The current data format.
   */
  async getDataFormat() {
    return this.runCommand(["--wda-get-data-format"]);
  }
  /**
   * Retrieves the serving system information.
   * @returns {Promise<string>} The current serving system.
   */
  async getServingSystem() {
    return this.runCommand(["--get-serving-system"]);
  }
};
export {
  UqmiClient
};
