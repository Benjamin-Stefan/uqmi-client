import { Client, ConnectConfig } from "ssh2";
import { readFileSync } from "fs";
import { SSHOptions } from "../types";

/**
 * Logs debug messages if the debug option is enabled.
 * @param {string} message - The debug message to log.
 * @param {boolean} [debug=false] - Whether to log the debug message.
 */
function logDebug(message: string, debug?: boolean) {
    if (debug) {
        // Sanitize the message to remove sensitive information
        const sanitizedMessage = sanitizeSensitiveData(message);
        if (sanitizedMessage.includes("****")) {
            console.log(`[DEBUG] Sensitive information omitted`);
        } else {
            console.log(`[DEBUG] ${sanitizedMessage}`);
        }
    }
}

/**
 * Sanitizes a message to remove sensitive information such as passwords, usernames, and other credentials.
 * @param {string} message - The message to sanitize.
 * @returns {string} The sanitized message.
 */
function sanitizeSensitiveData(message: string): string {
    return message
        .replace(/--password=\S+/g, '--password=****')
        .replace(/--username=\S+/g, '--username=****')
        .replace(/--apn=\S+/g, '--apn=****')
        .replace(/--auth-type=\S+/g, '--auth-type=****')
        .replace(/--ip-family=\S+/g, '--ip-family=****')
        .replace(/--device=\S+/g, '--device=****')
        .replace(/--set-client-id \S+/g, '--set-client-id ****')
        .replace(/--get-client-id \S+/g, '--get-client-id ****')
        .replace(/--sync/g, '--sync ****');
}

/**
 * Creates an SSH connection using the provided options.
 * @param {SSHOptions} options - The SSH connection options.
 * @returns {Promise<Client>} A promise that resolves with the SSH client when the connection is ready.
 * @throws {Error} If the connection fails or if the private key file cannot be loaded.
 *
 * @example
 * const options = {
 *   host: 'example.com',
 *   username: 'user',
 *   password: 'password'
 * };
 * createSSHConnection(options)
 *   .then(conn => {
 *     console.log('Connected successfully');
 *   })
 *   .catch(error => {
 *     console.error('Connection failed:', error);
 *   });
 */
function createSSHConnection(options: SSHOptions): Promise<Client> {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        const connectOptions: ConnectConfig = {
            host: options.host,
            port: options.port || 22,
            username: options.username,
        };

        if (options.password) {
            connectOptions.password = options.password;
        } else if (options.privateKeyPath) {
            try {
                connectOptions.privateKey = readFileSync(options.privateKeyPath);
            } catch (error) {
                if (error instanceof Error) {
                    return reject(new Error("Error loading private key: " + error.message));
                }
                throw error;
            }
            if (options.passphrase) {
                connectOptions.passphrase = options.passphrase;
            }
        } else {
            return reject(new Error("Password or private key must be provided."));
        }

        conn.on("ready", () => {
            logDebug("SSH connection established", options.debug);
            resolve(conn);
        })
            .on("error", (err) => {
                reject(new Error("Connection error: " + err.message));
            })
            .connect(connectOptions);
    });
}

/**
 * Executes a command on the SSH server.
 * @param {Client} conn - The SSH client connection.
 * @param {string} command - The command to be executed on the SSH server.
 * @param {boolean} [debug=false] - Whether to enable debug logging for the command execution.
 * @returns {Promise<string>} A promise that resolves with the command output as a string.
 * @throws {Error} If there is an error during command execution or if the command fails.
 *
 * @example
 * executeCommand(conn, 'ls -la')
 *   .then(output => {
 *     console.log('Command output:', output);
 *   })
 *   .catch(error => {
 *     console.error('Command failed:', error);
 *   });
 */
function executeCommand(conn: Client, command: string, debug?: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
        logDebug(`Executing command: ${command}`, debug);
        conn.exec(command, (err, stream) => {
            if (err) return reject(new Error("Command execution failed: " + err.message));

            let stdout = "";
            let stderr = "";

            stream
                .on("close", (code: number, signal: string | null) => {
                    logDebug(`Command closed with code: ${code}, signal: ${signal}`, debug);
                    conn.end(); // Close connection
                    if (stderr) {
                        return reject(new Error("Error output: " + stderr));
                    }
                    resolve(stdout);
                })
                .on("data", (data: Buffer) => {
                    stdout += data.toString();
                })
                .stderr.on("data", (data: Buffer) => {
                    stderr += data.toString();
                });
        });
    });
}

/**
 * Runs a command on a remote SSH server.
 * @param {string} command - The SSH command to execute.
 * @param {SSHOptions} options - The SSH connection options.
 * @returns {Promise<string>} A promise that resolves with the output of the executed command.
 * @throws {Error} If there is an error with the SSH connection or command execution.
 *
 * @example
 * const options = {
 *   host: 'example.com',
 *   username: 'user',
 *   password: 'password'
 * };
 * runSSHCommand('ls -la', options)
 *   .then(output => {
 *     console.log('Command output:', output);
 *   })
 *   .catch(error => {
 *     console.error('Execution failed:', error);
 *   });
 */
export async function runSSHCommand(command: string, options: SSHOptions): Promise<string> {
    try {
        const conn = await createSSHConnection(options);
        const output = await executeCommand(conn, command, options.debug);
        return output;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error("SSH command execution failed: " + error.message);
        }

        throw error;
    }
}
