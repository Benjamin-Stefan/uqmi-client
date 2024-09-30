import { Client, ClientChannel, ConnectConfig } from "ssh2";
import { promises as fs } from "fs";
import { SSHOptions } from "../types";
import { once } from "events";

/**
 * Creates an SSH connection using the provided options.
 *
 * @param {SSHOptions} options - The SSH connection options.
 *
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
async function createSSHConnection(options: SSHOptions): Promise<Client> {
    const conn = new Client();
    const connectOptions: ConnectConfig = {
        host: options.host,
        port: options.port || 22,
        username: options.username,
        readyTimeout: 20000,
    };

    if (options.password) {
        connectOptions.password = options.password;
    } else if (options.privateKeyPath) {
        try {
            connectOptions.privateKey = await fs.readFile(options.privateKeyPath);
        } catch (error) {
            throw new Error(`Error loading private key: ${(error as Error).message}`);
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

/**
 * Executes a command on the SSH server.
 * @param {Client} conn - The SSH client connection.
 * @param {string} command - The command to be executed on the SSH server.
 *
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
async function executeCommand(conn: Client, command: string): Promise<string> {
    const stream = await new Promise<ClientChannel>((resolve, reject) => {
        conn.exec(command, (err, stream) => {
            if (err) {
                return reject(new Error(`Command execution failed: ${err.message}`));
            }
            resolve(stream);
        });
    });

    let stdout = "";
    let stderr = "";

    stream.on("data", (data: Buffer) => {
        stdout += data.toString();
    });

    stream.stderr.on("data", (data: Buffer) => {
        stderr += data.toString();
    });

    await once(stream, "close");

    if (stderr) {
        throw new Error(`Command execution failed with error: ${stderr}`);
    }

    return stdout;
}

/**
 * Runs a command on a remote SSH server.
 * @param {string} command - The SSH command to execute.
 * @param {SSHOptions} options - The SSH connection options.
 *
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
    const conn = await createSSHConnection(options);
    try {
        return await executeCommand(conn, command);
    } finally {
        conn.end();
    }
}
