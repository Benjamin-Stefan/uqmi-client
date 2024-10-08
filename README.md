# UqmiClient

[![npm version](https://img.shields.io/npm/v/uqmi-client)](https://www.npmjs.com/package/uqmi-client)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Benjamin-Stefan/uqmi-client/ci.yml?branch=main)](https://github.com/Benjamin-Stefan/uqmi-client/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**UqmiClient** is a Node.js library for managing network-related commands over SSH, specifically designed to work with UQMI-compatible devices.

## Table of Contents

-   [Installation](#-installation)
-   [Usage](#-usage)
    -   [SSH options](#ssh-options)
    -   [Default options](#default-options)
-   [Finding Device Name](#-finding-device-name)
-   [Examples](#-examples)
-   [Contributing](#-contributing)
-   [License](#-license)

## 🛠 Installation

Install UqmiClient via npm:

```bash
npm install uqmi-client
```

## 🚀 Usage

Here’s an example of how to use the library to start a network session:

```javascript
import { UqmiClient } from "uqmi-client";

const client = new UqmiClient("/dev/cdc-wdm0", {
    host: "192.168.0.1",
    port: 22,
    username: "user",
    password: "password",
});

// Start a network session
(async () => {
    try {
        const versions = await uqmi.getVersions();
        console.log("Device Versions:", versions);
    } catch (error) {
        console.error("Failed to get device versions:", error);
    }
})();
```

### SSH options

```typescript
/**
 * SSH connection options for connecting to a remote device.
 *
 * @property {string} host - The SSH server hostname or IP address.
 * @property {number} [port=22] - The port to connect to (default is 22).
 * @property {string} username - The username to authenticate as on the SSH server.
 * @property {string} [password] - The password for authentication (used if no private key is provided).
 * @property {string} [privateKeyPath] - The path to the private key file for authentication (if password is not used).
 * @property {string} [passphrase] - The passphrase to unlock the private key (if the key is encrypted).
 */
export interface SSHOptions {
    host: string;
    port?: number;
    username: string;
    password?: string;
    privateKeyPath?: string;
    passphrase?: string;
}
```

### Default options

```typescript
/**
 * Options for configuring the Uqmi client, allowing for optional settings like timeout.
 *
 * @property {number} [timeout] - The timeout period (in milliseconds) for operations performed by the uqmi cli.
 */
export interface UqmiClientOptions {
    timeout?: number;
}
```

## 🔍 Finding Device Name

To identify the device name, run the following command on the target device:

```bash
ls /dev
```

Typically, the device name will be something like `cdc-wdm0`.

## 🧪 Examples

Explore more examples in the [examples](/examples) folder.

## 🤝 Contributing

Contributions are welcome! Please check out the [CONTRIBUTING.md](/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](/CODE_OF_CONDUCT.md) for details.

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
