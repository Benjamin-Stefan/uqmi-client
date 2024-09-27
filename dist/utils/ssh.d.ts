import { SSHOptions } from "../types";
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
export declare function runSSHCommand(command: string, options: SSHOptions): Promise<string>;
//# sourceMappingURL=ssh.d.ts.map