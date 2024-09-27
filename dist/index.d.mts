/**
 * Defines the options required for establishing an SSH connection, providing details about
 * the target server, authentication method, and optional debug settings.
 *
 * @property {string} host - The SSH server hostname or IP address.
 * @property {number} [port=22] - The port to connect to (default is 22).
 * @property {string} username - The username to authenticate as on the SSH server.
 * @property {string} [password] - The password for authentication (used if no private key is provided).
 * @property {string} [privateKeyPath] - The path to the private key file for authentication (if password is not used).
 * @property {string} [passphrase] - The passphrase to unlock the private key (if the key is encrypted).
 * @property {boolean} [debug=false] - Enables debug logging if set to true, useful for troubleshooting.
 *
 * @example
 * const options = {
 *   host: 'example.com',
 *   port: 22,
 *   username: 'user',
 *   privateKeyPath: '/path/to/key',
 *   passphrase: 'my-passphrase',
 *   debug: true
 * };
 */
interface SSHOptions {
    host: string;
    port?: number;
    username: string;
    password?: string;
    privateKeyPath?: string;
    passphrase?: string;
    debug?: boolean;
}

/**
 * Class representing a Uqmi client for managing network-related commands via SSH.
 */
declare class UqmiClient {
    protected device: string;
    protected sshOptions: SSHOptions;
    /**
     * Creates an instance of UqmiClient.
     * @param {string} device - The device identifier.
     * @param {SSHOptions} sshOptions - SSH options for connection.
     * @throws {Error} If the device is not specified.
     */
    constructor(device: string, sshOptions: SSHOptions);
    /**
     * Executes a uqmi command via SSH.
     * @protected
     * @param {string} command - The uqmi command to execute.
     * @returns {Promise<string>} The trimmed stdout response from the command.
     * @throws {Error} If the command execution fails.
     */
    protected runCommand(command: string): Promise<string>;
    /**
     * Retrieves the service versions.
     * @returns {Promise<string>} The service versions.
     */
    getVersions(): Promise<string>;
    /**
     * Sets the client ID for a specific service.
     * @param {string} serviceName - The name of the service.
     * @param {string} clientId - The client ID to set.
     * @returns {Promise<string>} Confirmation of the command execution.
     */
    setClientId(serviceName: string, clientId: string): Promise<string>;
    /**
     * Retrieves the client ID for a specific service.
     * @param {string} serviceName - The name of the service.
     * @returns {Promise<string>} The client ID.
     */
    getClientId(serviceName: string): Promise<string>;
    /**
     * Synchronizes all client IDs.
     * @returns {Promise<string>} Confirmation of the synchronization.
     */
    sync(): Promise<string>;
    /**
     * Starts the network connection with the specified parameters.
     * @param {string} apn - The APN (Access Point Name) to use.
     * @param {"pap" | "chap" | "both" | "none"} authType - The authentication type.
     * @param {string} [username] - Optional username for authentication.
     * @param {string} [password] - Optional password for authentication.
     * @param {"ipv4" | "ipv6" | "unspecified"} [ipFamily="unspecified"] - The IP family to use.
     * @returns {Promise<string>} Confirmation of the network start.
     */
    startNetwork(apn: string, authType: "pap" | "chap" | "both" | "none", username?: string, password?: string, ipFamily?: "ipv4" | "ipv6" | "unspecified"): Promise<string>;
    /**
     * Stops the network connection.
     * @param {string} pdh - The PDH (Packet Data Handler).
     * @param {boolean} [autoconnect=false] - Whether to enable autoconnect after stopping.
     * @returns {Promise<string>} Confirmation of the network stop.
     */
    stopNetwork(pdh: string, autoconnect?: boolean): Promise<string>;
    /**
     * Retrieves the current data status.
     * @returns {Promise<string>} The current data status.
     */
    getDataStatus(): Promise<string>;
    /**
     * Sets the IP family.
     * @param {"ipv4" | "ipv6" | "unspecified"} ipFamily - The IP family to set.
     * @returns {Promise<string>} Confirmation of the IP family change.
     */
    setIPFamily(ipFamily: "ipv4" | "ipv6" | "unspecified"): Promise<string>;
    /**
     * Sets the autoconnect feature.
     * @param {"disabled" | "enabled" | "paused"} value - The autoconnect state to set.
     * @returns {Promise<string>} Confirmation of the autoconnect state change.
     */
    setAutoconnect(value: "disabled" | "enabled" | "paused"): Promise<string>;
    /**
     * Retrieves the current network settings.
     * @returns {Promise<string>} The current network settings.
     */
    getCurrentSettings(): Promise<string>;
    /**
     * Retrieves the device capabilities.
     * @returns {Promise<string>} The device capabilities.
     */
    getCapabilities(): Promise<string>;
    /**
     * Retrieves the PIN status.
     * @returns {Promise<string>} The PIN status.
     */
    getPinStatus(): Promise<string>;
    /**
     * Verifies PIN1.
     * @param {string} pin - The PIN1 to verify.
     * @returns {Promise<string>} Confirmation of the PIN1 verification.
     */
    verifyPin1(pin: string): Promise<string>;
    /**
     * Verifies PIN2.
     * @param {string} pin - The PIN2 to verify.
     * @returns {Promise<string>} Confirmation of the PIN2 verification.
     */
    verifyPin2(pin: string): Promise<string>;
    /**
     * Sets the protection for PIN1.
     * @param {"enabled" | "disabled"} state - The protection state for PIN1.
     * @param {string} pin - The PIN1 to protect.
     * @returns {Promise<string>} Confirmation of the PIN1 protection change.
     */
    setPin1Protection(state: "enabled" | "disabled", pin: string): Promise<string>;
    /**
     * Sets the protection for PIN2.
     * @param {"enabled" | "disabled"} state - The protection state for PIN2.
     * @param {string} pin2 - The PIN2 to protect.
     * @returns {Promise<string>} Confirmation of the PIN2 protection change.
     */
    setPin2Protection(state: "enabled" | "disabled", pin2: string): Promise<string>;
    /**
     * Changes PIN1.
     * @param {string} oldPin - The old PIN1.
     * @param {string} newPin - The new PIN1.
     * @returns {Promise<string>} Confirmation of the PIN1 change.
     */
    changePin1(oldPin: string, newPin: string): Promise<string>;
    /**
     * Changes PIN2.
     * @param {string} oldPin - The old PIN2.
     * @param {string} newPin - The new PIN2.
     * @returns {Promise<string>} Confirmation of the PIN2 change.
     */
    changePin2(oldPin: string, newPin: string): Promise<string>;
    /**
     * Unblocks PIN1 using PUK.
     * @param {string} puk - The PUK to unblock PIN1.
     * @param {string} newPin - The new PIN1 to set.
     * @returns {Promise<string>} Confirmation of the PIN1 unblock.
     */
    unblockPin1(puk: string, newPin: string): Promise<string>;
    /**
     * Unblocks PIN2 using PUK.
     * @param {string} puk - The PUK to unblock PIN2.
     * @param {string} newPin - The new PIN2 to set.
     * @returns {Promise<string>} Confirmation of the PIN2 unblock.
     */
    unblockPin2(puk: string, newPin: string): Promise<string>;
    /**
     * Retrieves the ICCID (Integrated Circuit Card Identifier).
     * @returns {Promise<string>} The ICCID.
     */
    getICCID(): Promise<string>;
    /**
     * Retrieves the IMSI (International Mobile Subscriber Identity).
     * @returns {Promise<string>} The IMSI.
     */
    getIMSI(): Promise<string>;
    /**
     * Retrieves the IMEI (International Mobile Equipment Identity).
     * @returns {Promise<string>} The IMEI.
     */
    getIMEI(): Promise<string>;
    /**
     * Retrieves the MSISDN (Mobile Station International Subscriber Directory Number).
     * @returns {Promise<string>} The MSISDN.
     */
    getMSISDN(): Promise<string>;
    /**
     * Resets the DMS service.
     * @returns {Promise<string>} Confirmation of the DMS reset.
     */
    resetDMS(): Promise<string>;
    /**
     * Retrieves the current device operating mode.
     * @returns {Promise<string>} The device operating mode.
     */
    getDeviceOperatingMode(): Promise<string>;
    /**
     * Sets the device operating mode.
     * @param {"online" | "low_power" | "factory_test" | "offline" | "reset" | "shutting_down" | "persistent_low_power" | "mode_only_low_power"} mode - The mode to set.
     * @returns {Promise<string>} Confirmation of the mode change.
     */
    setDeviceOperatingMode(mode: "online" | "low_power" | "factory_test" | "offline" | "reset" | "shutting_down" | "persistent_low_power" | "mode_only_low_power"): Promise<string>;
    /**
     * Executes FCC authorization.
     * @returns {Promise<string>} Confirmation of the FCC authorization.
     */
    setFCCAuth(): Promise<string>;
    /**
     * Verifies PIN1 for new devices.
     * @param {string} pin - The PIN1 to verify.
     * @returns {Promise<string>} Confirmation of the PIN1 verification.
     */
    uimVerifyPin1(pin: string): Promise<string>;
    /**
     * Verifies PIN2 for new devices.
     * @param {string} pin - The PIN2 to verify.
     * @returns {Promise<string>} Confirmation of the PIN2 verification.
     */
    uimVerifyPin2(pin: string): Promise<string>;
    /**
     * Retrieves the SIM card state.
     * @returns {Promise<string>} The SIM state.
     */
    getSIMState(): Promise<string>;
    /**
     * Sets the network modes.
     * @param {string[]} modes - The network modes to set.
     * @returns {Promise<string>} Confirmation of the network mode setting.
     */
    setNetworkModes(modes: string[]): Promise<string>;
    /**
     * Performs a network scan.
     * @returns {Promise<string>} The results of the network scan.
     */
    networkScan(): Promise<string>;
    /**
     * Initiates network registration.
     * @returns {Promise<string>} Confirmation of the network registration.
     */
    networkRegister(): Promise<string>;
    /**
     * Sets the PLMN (Public Land Mobile Network).
     * @param {string} mcc - The Mobile Country Code.
     * @param {string} mnc - The Mobile Network Code.
     * @returns {Promise<string>} Confirmation of the PLMN setting.
     */
    setPLMN(mcc: string, mnc: string): Promise<string>;
    /**
     * Retrieves the PLMN (Public Land Mobile Network).
     * @returns {Promise<string>} The PLMN information.
     */
    getPLMN(): Promise<string>;
    /**
     * Retrieves signal information.
     * @returns {Promise<string>} The signal information.
     */
    getSignalInfo(): Promise<string>;
    /**
     * Lists SMS messages.
     * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
     * @returns {Promise<string>} The list of SMS messages.
     */
    listMessages(storage?: "sim" | "me"): Promise<string>;
    /**
     * Deletes an SMS message.
     * @param {number} id - The ID of the SMS message to delete.
     * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
     * @returns {Promise<string>} Confirmation of the SMS deletion.
     */
    deleteMessage(id: number, storage?: "sim" | "me"): Promise<string>;
    /**
     * Retrieves an SMS message.
     * @param {number} id - The ID of the SMS message to retrieve.
     * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
     * @returns {Promise<string>} The content of the SMS message.
     */
    getMessage(id: number, storage?: "sim" | "me"): Promise<string>;
    /**
     * Retrieves the raw content of an SMS message.
     * @param {number} id - The ID of the SMS message to retrieve.
     * @param {"sim" | "me"} [storage="sim"] - The storage location of the SMS messages.
     * @returns {Promise<string>} The raw content of the SMS message.
     */
    getRawMessage(id: number, storage?: "sim" | "me"): Promise<string>;
    /**
     * Sends an SMS message.
     * @param {string} destinationNumber - The destination phone number.
     * @param {string} message - The content of the SMS message.
     * @param {boolean} [flash=false] - Whether to send the SMS as a flash message.
     * @param {string} [smsc] - The SMS service center number.
     * @returns {Promise<string>} Confirmation of the SMS sending.
     */
    sendMessage(destinationNumber: string, message: string, flash?: boolean, smsc?: string): Promise<string>;
    /**
     * Sets the data format.
     * @param {"802.3" | "raw-ip"} type - The data format to set.
     * @returns {Promise<string>} Confirmation of the data format setting.
     */
    setDataFormat(type: "802.3" | "raw-ip"): Promise<string>;
    /**
     * Retrieves the data format.
     * @returns {Promise<string>} The current data format.
     */
    getDataFormat(): Promise<string>;
}

export { UqmiClient };
