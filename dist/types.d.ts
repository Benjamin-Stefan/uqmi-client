/**
 * Defines the options required for establishing an SSH connection, providing details about
 * the target server, authentication method, and optional settings.
 *
 * @property {string} host - The SSH server hostname or IP address.
 * @property {number} [port=22] - The port to connect to (default is 22).
 * @property {string} username - The username to authenticate as on the SSH server.
 * @property {string} [password] - The password for authentication (used if no private key is provided).
 * @property {string} [privateKeyPath] - The path to the private key file for authentication (if password is not used).
 * @property {string} [passphrase] - The passphrase to unlock the private key (if the key is encrypted).
 *
 * @example
 * const options = {
 *   host: 'example.com',
 *   port: 22,
 *   username: 'user',
 *   privateKeyPath: '/path/to/key',
 *   passphrase: 'my-passphrase',
 * };
 */
export interface SSHOptions {
    host: string;
    port?: number;
    username: string;
    password?: string;
    privateKeyPath?: string;
    passphrase?: string;
}
/**
 * Enum-like type that defines various service types supported by the system.
 *
 * @description
 * ServiceType represents a set of valid services that can be interacted with. Each service type
 * is represented as a string and can be one of the following:
 * - "wds": Wireless data service
 * - "nas": Network access service
 * - "uim": User identity module service
 * - "sms": Short message service
 * - "voice": Voice service
 * - "dms": Device management service
 * - "gps": Global positioning service
 *
 * @example
 * const myService: ServiceType = "sms";
 */
export type ServiceType = "wds" | "nas" | "uim" | "sms" | "voice" | "dms" | "gps";
export interface UqmiClientOptions {
    timeout?: number;
}
//# sourceMappingURL=types.d.ts.map