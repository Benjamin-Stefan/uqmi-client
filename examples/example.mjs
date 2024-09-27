import { UqmiClient } from "../dist/index.mjs";

// Create SSH options with private key
const sshOptions = {
    host: "192.168.0.1",
    port: 22,
    username: "admin",
    privateKey: "/path/to/private/key",
};

// Create SSH options with protected private key
// const sshOptions = {
//     host: "192.168.0.1",
//     port: 22,
//     username: "admin",
//     privateKey: "/path/to/private/key",
//     passphrase: "passForPrivateKey",
// };

// Create SSH option with username and password
// const sshOptions = {
//     host: "192.168.0.1",
//     port: 22,
//     username: "admin",
//     password: "pass",
// };

// Instantiate the UqmiClient
const uqmi = new UqmiClient("cdc-wdm0", sshOptions);

// Example function to get device versions
async function getDeviceVersions() {
    try {
        const versions = await uqmi.getVersions();
        console.log("Device Versions:", versions);
    } catch (error) {
        console.error("Failed to get device versions:", error);
    }
}

getDeviceVersions();
