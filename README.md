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
-   [Supported Commands](#supported-commands)
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

Explore more examples in the [examples](./examples) folder.

## ⚙️ Supported Commands

The `UqmiClient` class provides several commands to manage network-related operations via SSH. Each command is executed through the underlying `runCommand` function, which sends the appropriate command over SSH.

### General Commands

-   **Get Service Versions:**

    -   `getVersions()`: Retrieves the service versions.
    -   **SSH Command:** `uqmi --device=<device> --get-versions`

-   **Set and Get Client ID:**

    -   `setClientId(serviceName: string, clientId: string)`: Sets the client ID for a specific service.
    -   **SSH Command:** `uqmi --device=<device> --set-client-id <serviceName>,<clientId>`
    -   `getClientId(serviceName: string)`: Retrieves the client ID for a specific service.
    -   **SSH Command:** `uqmi --device=<device> --get-client-id <serviceName>`

-   **Synchronize Client IDs:**
    -   `sync()`: Synchronizes all client IDs.
    -   **SSH Command:** `uqmi --device=<device> --sync`

### Network Management

-   **Start Network Connection:**

    -   `startNetwork(apn: string, authType: "pap" | "chap" | "both" | "none", username?: string, password?: string, ipFamily: "ipv4" | "ipv6" | "unspecified" = "unspecified")`: Starts a network connection using the specified parameters.
    -   **SSH Command:** `uqmi --device=<device> --start-network --apn=<apn> --auth-type=<authType> --ip-family=<ipFamily> [--username=<username>] [--password=<password>]`

-   **Stop Network Connection:**

    -   `stopNetwork(pdh: string, autoconnect: boolean = false)`: Stops the network connection.
    -   **SSH Command:** `uqmi --device=<device> --stop-network <pdh> [--autoconnect]`

-   **Get Data Status:**

    -   `getDataStatus()`: Retrieves the current data status.
    -   **SSH Command:** `uqmi --device=<device> --get-data-status`

-   **Set IP Family:**

    -   `setIPFamily(ipFamily: "ipv4" | "ipv6" | "unspecified")`: Sets the IP family.
    -   **SSH Command:** `uqmi --device=<device> --set-ip-family <ipFamily>`

-   **Set Autoconnect:**

    -   `setAutoconnect(value: "disabled" | "enabled" | "paused")`: Configures autoconnect.
    -   **SSH Command:** `uqmi --device=<device> --set-autoconnect <value>`

-   **Get Current Network Settings:**

    -   `getCurrentSettings()`: Retrieves the current network settings.
    -   **SSH Command:** `uqmi --device=<device> --get-current-settings`

-   **Set Network Modes:**

    -   `setNetworkModes(modes: string[])`: Sets the network configuration modes.
    -   **SSH Command:** `uqmi --device=<device> --set-network-modes <mode1>,<mode2>,...`

-   **Network Scanning and Registration:**
    -   `networkScan()`: Performs a network scan.
    -   **SSH Command:** `uqmi --device=<device> --network-scan`
    -   `networkRegister()`: Registers the device on the network.
    -   **SSH Command:** `uqmi --device=<device> --network-register`

### SIM and PIN Management

-   **Get SIM Card State:**

    -   `getSIMState()`: Retrieves the current SIM card state.
    -   **SSH Command:** `uqmi --device=<device> --uim-get-sim-state`

-   **Get and Verify PIN Status:**

    -   `getPinStatus()`: Retrieves the current PIN status.
    -   **SSH Command:** `uqmi --device=<device> --get-pin-status`
    -   `verifyPin1(pin: string)`: Verifies PIN1.
    -   **SSH Command:** `uqmi --device=<device> --verify-pin1 <pin>`
    -   `verifyPin2(pin: string)`: Verifies PIN2.
    -   **SSH Command:** `uqmi --device=<device> --verify-pin2 <pin>`

-   **Manage PIN Protection:**

    -   `setPin1Protection(state: "enabled" | "disabled", pin: string)`: Sets protection for PIN1.
    -   **SSH Command:** `uqmi --device=<device> --set-pin1-protection <state> --pin <pin>`
    -   `setPin2Protection(state: "enabled" | "disabled", pin2: string)`: Sets protection for PIN2.
    -   **SSH Command:** `uqmi --device=<device> --set-pin2-protection <state> --pin <pin2>`

-   **Change and Unblock PIN:**
    -   `changePin1(oldPin: string, newPin: string)`: Changes PIN1.
    -   **SSH Command:** `uqmi --device=<device> --change-pin1 --pin <oldPin> --new-pin <newPin>`
    -   `unblockPin1(puk: string, newPin: string)`: Unblocks PIN1 using PUK.
    -   **SSH Command:** `uqmi --device=<device> --unblock-pin1 --puk <puk> --new-pin <newPin>`

### Device and Signal Information

-   **Retrieve Device Information:**

    -   `getICCID()`: Retrieves the ICCID.
    -   **SSH Command:** `uqmi --device=<device> --get-iccid`
    -   `getIMSI()`: Retrieves the IMSI.
    -   **SSH Command:** `uqmi --device=<device> --get-imsi`
    -   `getIMEI()`: Retrieves the IMEI.
    -   **SSH Command:** `uqmi --device=<device> --get-imei`
    -   `getMSISDN()`: Retrieves the MSISDN.
    -   **SSH Command:** `uqmi --device=<device> --get-msisdn`

-   **Manage Device Operating Modes:**

    -   `getDeviceOperatingMode()`: Retrieves the current device operating mode.
    -   **SSH Command:** `uqmi --device=<device> --get-device-operating-mode`
    -   `setDeviceOperatingMode(mode: "online" | "low_power" | "factory_test" | "offline" | "reset" | "shutting_down" | "persistent_low_power" | "mode_only_low_power")`: Sets the device operating mode.
    -   **SSH Command:** `uqmi --device=<device> --set-device-operating-mode <mode>`

-   **Get Signal Information:**
    -   `getSignalInfo()`: Retrieves signal information.
    -   **SSH Command:** `uqmi --device=<device> --get-signal-info`
    -   `getServingSystem()`: Retrieves serving system information.
    -   **SSH Command:** `uqmi --device=<device> --get-serving-system`

### SMS Management

-   **List, Retrieve, and Delete SMS Messages:**

    -   `listMessages(storage: "sim" | "me" = "sim")`: Lists SMS messages from the specified storage.
    -   **SSH Command:** `uqmi --device=<device> --list-messages --storage <storage>`
    -   `deleteMessage(id: number, storage: "sim" | "me" = "sim")`: Deletes an SMS message.
    -   **SSH Command:** `uqmi --device=<device> --delete-message <id> --storage <storage>`
    -   `getMessage(id: number, storage: "sim" | "me" = "sim")`: Retrieves an SMS message.
    -   **SSH Command:** `uqmi --device=<device> --get-message <id> --storage <storage>`

-   **Send SMS:**
    -   `sendMessage(destinationNumber: string, message: string, flash: boolean = false, smsc?: string)`: Sends an SMS message.
    -   **SSH Command:** `uqmi --device=<device> --send-message <message> --send-message-target <destinationNumber> [--send-message-flash] [--send-message-smsc <smsc>]`

### Data Format

-   **Set and Get Data Format:**
    -   `setDataFormat(type: "802.3" | "raw-ip")`: Sets the data format.
    -   **SSH Command:** `uqmi --device=<device> --wda-set-data-format <type>`
    -   `getDataFormat()`: Retrieves the current data format.
    -   **SSH Command:** `uqmi --device=<device> --wda-get-data-format`

### Additional Operations

-   **Reset DMS Service:**

    -   `resetDMS()`: Resets the DMS service.
    -   **SSH Command:** `uqmi --device=<device> --reset-dms`

-   **FCC Authorization:**
    -   `setFCCAuth()`: Executes FCC authorization.
    -   **SSH Command:** `uqmi --device=<device> --fcc-auth`

## 🤝 Contributing

Contributions are welcome! Please check out the [CONTRIBUTING.md](/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](/CODE_OF_CONDUCT.md) for details.

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
