[**UqmiClient v1.1.0**](../README.md)

***

[UqmiClient](../README.md) / SSHOptions

# Interface: SSHOptions

Defines the options required for establishing an SSH connection, providing details about
the target server, authentication method, and optional settings.

## Example

```ts
const options = {
  host: 'example.com',
  port: 22,
  username: 'user',
  privateKeyPath: '/path/to/key',
  passphrase: 'my-passphrase',
};
```
