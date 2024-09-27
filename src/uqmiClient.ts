import { SSHOptions } from "./types";
import { runSSHCommand } from "./utils/ssh";

/**
 * Class representing a Uqmi client for managing network-related commands via SSH.
 */
export class UqmiClient {
    protected device!: string;
    protected sshOptions!: SSHOptions;

    /**
     * Creates an instance of UqmiClient.
     * @param {string} device - The device identifier.
     * @param {SSHOptions} sshOptions - SSH options for connection.
     * @throws {Error} If the device is not specified.
     */
    constructor(device: string, sshOptions: SSHOptions) {
        if (!device) {
            throw new Error("Device must be specified");
        }
        this.device = device;
        this.sshOptions = sshOptions;
    }

    /**
     * Escapes shell arguments to prevent command injection.
     * This function escapes dangerous characters and ensures that inputs are safe.
     * @param {string} arg - The argument to escape.
     * @returns {string} The escaped argument.
     */
    private escapeShellArg(arg: string): string {
        // Replace single quotes in the argument and wrap it in single quotes
        return `'${arg.replace(/'/g, `'\\''`)}'`;
    }

    /**
     * Executes a uqmi command via SSH.
     * @protected
     * @param {string} command - The uqmi command to execute.
     * @returns {Promise<string>} The trimmed stdout response from the command.
     * @throws {Error} If the command execution fails.
     */
    protected async runCommand(args: string[]): Promise<string> {
        try {
            args.unshift(`--device=${this.device}`);

            // Escape all arguments before concatenating them into a single command string
            const escapedArgs = args.map(this.escapeShellArg).join(" ");
            const stdout = await runSSHCommand(`uqmi ${escapedArgs}`, this.sshOptions);
            return stdout.trim();
        } catch (error) {
            throw new Error(`Error executing uqmi command: ${error}`);
        }
    }

    /**
     * Retrieves the service versions.
     * @returns {Promise<string>} The service versions.
     */
    public async getVersions(): Promise<string> {
        return this.runCommand(["--get-versions"]);
    }

    /**
     * Sets the client ID for a specific service.
     * @param {string} serviceName - The name of the service.
     * @param {string} clientId - The client ID to set.
     * @returns {Promise<string>} Confirmation of the command execution.
     */
    public async setClientId(serviceName: string, clientId: string): Promise<string> {
        return this.runCommand([`--set-client-id ${serviceName},${clientId}`]);
    }

    /**
     * Retrieves the client ID for a specific service.
     * @param {string} serviceName - The name of the service.
     * @returns {Promise<string>} The client ID.
     */
    public async getClientId(serviceName: string): Promise<string> {
        return this.runCommand([`--get-client-id ${serviceName}`]);
    }

    /**
     * Synchronizes all client IDs.
     * @returns {Promise<string>} Confirmation of the synchronization.
     */
    public async sync(): Promise<string> {
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
    public async startNetwork(apn: string, authType: "pap" | "chap" | "both" | "none", username?: string, password?: string, ipFamily: "ipv4" | "ipv6" | "unspecified" = "unspecified"): Promise<string> {
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
    public async stopNetwork(pdh: string, autoconnect = false): Promise<string> {
        let args = [`--stop-network ${pdh}`];
        if (autoconnect) args.push(` --autoconnect`);
        return this.runCommand(args);
    }

    /**
     * Retrieves the current data status.
     * @returns {Promise<string>} The current data status.
     */
    public async getDataStatus(): Promise<string> {
        return this.runCommand(["--get-data-status"]);
    }

    /**
     * Sets the IP family.
     * @param {"ipv4" | "ipv6" | "unspecified"} ipFamily - The IP family to set.
     * @returns {Promise<string>} Confirmation of the IP family change.
     */
    public async setIPFamily(ipFamily: "ipv4" | "ipv6" | "unspecified"): Promise<string> {
        return this.runCommand([`--set-ip-family ${ipFamily}`]);
    }

    /**
     * Sets the autoconnect feature.
     * @param {"disabled" | "enabled" | "paused"} value - The autoconnect state to set.
     * @returns {Promise<string>} Confirmation of the autoconnect state change.
     */
    public async setAutoconnect(value: "disabled" | "enabled" | "paused"): Promise<string> {
        return this.runCommand([`--set-autoconnect ${value}`]);
    }

    /**
     * Retrieves the current network settings.
     * @returns {Promise<string>} The current network settings.
     */
    public async getCurrentSettings(): Promise<string> {
        return this.runCommand(["--get-current-settings"]);
    }

    /**
     * Retrieves the device capabilities.
     * @returns {Promise<string>} The device capabilities.
     */
    public async getCapabilities(): Promise<string> {
        return this.runCommand(["--get-capabilities"]);
    }

    /**
     * Retrieves the PIN status.
     * @returns {Promise<string>} The PIN status.
     */
    public async getPinStatus(): Promise<string> {
        return this.runCommand(["--get-pin-status"]);
    }

    /**
     * Verifies PIN1.
     * @param {string} pin - The PIN1 to verify.
     * @returns {Promise<string>} Confirmation of the PIN1 verification.
     */
    public async verifyPin1(pin: string): Promise<string> {
        return this.runCommand([`--verify-pin1 ${pin}`]);
    }

    /**
     * Verifies PIN2.
     * @param {string} pin - The PIN2 to verify.
     * @returns {Promise<string>} Confirmation of the PIN2 verification.
     */
    public async verifyPin2(pin: string): Promise<string> {
        return this.runCommand([`--verify-pin2 ${pin}`]);
    }

    /**
     * Sets the protection for PIN1.
     * @param {"enabled" | "disabled"} state - The protection state for PIN1.
     * @param {string} pin - The PIN1 to protect.
     * @returns {Promise<string>} Confirmation of the PIN1 protection change.
     */
    public async setPin1Protection(state: "enabled" | "disabled", pin: string): Promise<string> {
        return this.runCommand([`--set-pin1-protection ${state}`, `--pin ${pin}`]);
    }

    /**
     * Sets the protection for PIN2.
     * @param {"enabled" | "disabled"} state - The protection state for PIN2.
     * @param {string} pin2 - The PIN2 to protect.
     * @returns {Promise<string>} Confirmation of the PIN2 protection change.
     */
    public async setPin2Protection(state: "enabled" | "disabled", pin2: string): Promise<string> {
        return this.runCommand([`--set-pin2-protection ${state}`, `--pin ${pin2}`]);
    }

    /**
     * Changes PIN1.
     * @param {string} oldPin - The old PIN1.
     * @param {string} newPin - The new PIN1.
     * @returns {Promise<string>} Confirmation of the PIN1 change.
     */
    public async changePin1(oldPin: string, newPin: string): Promise<string> {
        return this.runCommand([`--change-pin1`, `--pin ${oldPin}`, `--new-pin ${newPin}`]);
    }

    /**
     * Changes PIN2.
     * @param {string} oldPin - The old PIN2.
     * @param {string} newPin - The new PIN2.
     * @returns {Promise<string>} Confirmation of the PIN2 change.
     */
    public async changePin2(oldPin: string, newPin: string): Promise<string> {
        return this.runCommand([`--change-pin2`, `--pin ${oldPin}`, `--new-pin ${newPin}`]);
    }

    /**
     * Unblocks PIN1 using PUK.
     * @param {string} puk - The PUK to unblock PIN1.
     * @param {string} newPin - The new PIN1 to set.
     * @returns {Promise<string>} Confirmation of the PIN1 unblock.
     */
    public async unblockPin1(puk: string, newPin: string): Promise<string> {
        return this.runCommand([`--unblock-pin1`, `--puk ${puk}`, `--new-pin ${newPin}`]);
    }

    /**
     * Unblocks PIN2 using PUK.
     * @param {string} puk - The PUK to unblock PIN2.
     * @param {string} newPin - The new PIN2 to set.
     * @returns {Promise<string>} Confirmation of the PIN2 unblock.
     */
    public async unblockPin2(puk: string, newPin: string): Promise<string> {
        return this.runCommand([`--unblock-pin2`, `--puk ${puk}`, `--new-pin ${newPin}`]);
    }

    /**
     * Retrieves the ICCID (Integrated Circuit Card Identifier).
     * @returns {Promise<string>} The ICCID.
     */
    public async getICCID(): Promise<string> {
        return this.runCommand(["--get-iccid"]);
    }

    /**
     * Retrieves the IMSI (International Mobile Subscriber Identity).
     * @returns {Promise<string>} The IMSI.
     */
    public async getIMSI(): Promise<string> {
        return this.runCommand(["--get-imsi"]);
    }

    /**
     * Retrieves the IMEI (International Mobile Equipment Identity).
     * @returns {Promise<string>} The IMEI.
     */
    public async getIMEI(): Promise<string> {
        return this.runCommand(["--get-imei"]);
    }

    /**
     * Retrieves the MSISDN (Mobile Station International Subscriber Directory Number).
     * @returns {Promise<string>} The MSISDN.
     */
    public async getMSISDN(): Promise<string> {
        return this.runCommand(["--get-msisdn"]);
    }

    /**
     * Resets the DMS service.
     * @returns {Promise<string>} Confirmation of the DMS reset.
     */
    public async resetDMS(): Promise<string> {
        return this.runCommand(["--reset-dms"]);
    }

    /**
     * Retrieves the current device operating mode.
     * @returns {Promise<string>} The device operating mode.
     */
    public async getDeviceOperatingMode(): Promise<string> {
        return this.runCommand(["--get-device-operating-mode"]);
    }

    /**
     * Sets the device operating mode.
     * @param {"online" | "low_power" | "factory_test" | "offline" | "reset" | "shutting_down" | "persistent_low_power" | "mode_only_low_power"} mode - The mode to set.
     * @returns {Promise<string>} Confirmation of the mode change.
     */
    public async setDeviceOperatingMode(mode: "online" | "low_power" | "factory_test" | "offline" | "reset" | "shutting_down" | "persistent_low_power" | "mode_only_low_power"): Promise<string> {
        return this.runCommand([`--set-device-operating-mode ${mode}`]);
    }

    /**
     * Executes FCC authorization.
     * @returns {Promise<string>} Confirmation of the FCC authorization.
     */
    public async setFCCAuth(): Promise<string> {
        return this.runCommand(["--fcc-auth"]);
    }

    /**
     * Verifies PIN1 for new devices.
     * @param {string} pin - The PIN1 to verify.
     * @returns {Promise<string>} Confirmation of the PIN1 verification.
     */
    public async uimVerifyPin1(pin: string): Promise<string> {
        return this.runCommand([`--uim-verify-pin1 ${pin}`]);
    }

    /**
     * Verifies PIN2 for new devices.
     * @param {string} pin - The PIN2 to verify.
     * @returns {Promise<string>} Confirmation of the PIN2 verification.
     */
    public async uimVerifyPin2(pin: string): Promise<string> {
        return this.runCommand([`--uim-verify-pin2 ${pin}`]);
    }

    /**
     * Retrieves the SIM card state.
     * @returns {Promise<string>} The SIM state.
     */
    public async getSIMState(): Promise<string> {
        return this.runCommand(["--uim-get-sim-state"]);
    }

    /**
     * Sets the network modes.
     * @param {string[]} modes - The network modes to set.
     * @returns {Promise<string>} Confirmation of the network mode setting.
     */
    public async setNetworkModes(modes: string[]): Promise<string> {
        const modeString = modes.join(",");
        return this.runCommand([`--set-network-modes ${modeString}`]);
    }

    /**
     * Performs a network scan.
     * @returns {Promise<string>} The results of the network scan.
     */
    public async networkScan(): Promise<string> {
        return this.runCommand(["--network-scan"]);
    }

    /**
     * Initiates network registration.
     * @returns {Promise<string>} Confirmation of the network registration.
     */
    public async networkRegister(): Promise<string> {
        return this.runCommand(["--network-register"]);
    }

    /**
     * Sets the PLMN (Public Land Mobile Network).
     * @param {string} mcc - The Mobile Country Code.
     * @param {string} mnc - The Mobile Network Code.
     * @returns {Promise<string>} Confirmation of the PLMN setting.
     */
    public async setPLMN(mcc: string, mnc: string): Promise<string> {
        return this.runCommand([`--set-plmn`, `--mcc ${mcc}`, `--mnc ${mnc}`]);
    }

    /**
     * Retrieves the PLMN (Public Land Mobile Network).
     * @returns {Promise<string>} The PLMN information.
     */
    public async getPLMN(): Promise<string> {
        return this.runCommand(["--get-plmn"]);
    }

    /**
     * Retrieves signal information.
     * @returns {Promise<string>} The signal information.
     */
    public async getSignalInfo(): Promise<string> {
        return this.runCommand(["--get-signal-info"]);
    }

    /**
     * Lists SMS messages.
     * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
     * @returns {Promise<string>} The list of SMS messages.
     */
    public async listMessages(storage: "sim" | "me" = "sim"): Promise<string> {
        return this.runCommand([`--list-messages`, `--storage ${storage}`]);
    }

    /**
     * Deletes an SMS message.
     * @param {number} id - The ID of the SMS message to delete.
     * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
     * @returns {Promise<string>} Confirmation of the SMS deletion.
     */
    public async deleteMessage(id: number, storage: "sim" | "me" = "sim"): Promise<string> {
        return this.runCommand([`--delete-message ${id}`, `--storage ${storage}`]);
    }

    /**
     * Retrieves an SMS message.
     * @param {number} id - The ID of the SMS message to retrieve.
     * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
     * @returns {Promise<string>} The content of the SMS message.
     */
    public async getMessage(id: number, storage: "sim" | "me" = "sim"): Promise<string> {
        return this.runCommand([`--get-message ${id}`, `--storage ${storage}`]);
    }

    /**
     * Retrieves the raw content of an SMS message.
     * @param {number} id - The ID of the SMS message to retrieve.
     * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
     * @returns {Promise<string>} The raw content of the SMS message.
     */
    public async getRawMessage(id: number, storage: "sim" | "me" = "sim"): Promise<string> {
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
    public async sendMessage(destinationNumber: string, message: string, flash: boolean = false, smsc?: string): Promise<string> {
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
    public async setDataFormat(type: "802.3" | "raw-ip"): Promise<string> {
        return this.runCommand([`--wda-set-data-format ${type}`]);
    }

    /**
     * Retrieves the data format.
     * @returns {Promise<string>} The current data format.
     */
    public async getDataFormat(): Promise<string> {
        return this.runCommand(["--wda-get-data-format"]);
    }
}
