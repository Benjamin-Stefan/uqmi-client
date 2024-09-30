import { UqmiClient } from "./uqmiClient";
import { SSHOptions, UqmiClientOptions } from "./types";

// Mock SSHOptions
const mockSSHOptions: SSHOptions = {
    host: "127.0.0.1",
    port: 22,
    username: "root",
};

describe("UqmiClient Constructor", () => {
    test("should initialize with default uqmiClientOptions", () => {
        const client = new UqmiClient("device1", mockSSHOptions);

        expect(client["device"]).toBe("device1");
        expect(client["sshOptions"]).toEqual(mockSSHOptions);
        expect(client["uqmiClientOptions"]).toEqual({ timeout: 10000 });
    });

    test("should override default uqmiClientOptions with provided values", () => {
        const options: UqmiClientOptions = { timeout: 5000 };
        const client = new UqmiClient("device1", mockSSHOptions, options);

        expect(client["uqmiClientOptions"]).toEqual({ timeout: 5000 });
    });

    test("should only override uqmiClientOptions if values are not null or undefined", () => {
        const options: UqmiClientOptions = {}; // Setting timeout to null
        const client = new UqmiClient("device1", mockSSHOptions, options);

        // Expect default timeout since null should be ignored
        expect(client["uqmiClientOptions"]).toEqual({ timeout: 10000 });
    });

    test("should throw an error if device is not provided", () => {
        expect(() => {
            new UqmiClient("", mockSSHOptions);
        }).toThrow("Device must be specified");
    });
});

describe("UqmiClient escapeShellArg", () => {
    let client: UqmiClient;

    beforeEach(() => {
        client = new UqmiClient("device1", mockSSHOptions);
    });

    test("should escape single quotes correctly", () => {
        const input = "some'command";
        const escaped = client["escapeShellArg"](input);
        expect(escaped).toBe("'some'\\''command'");
    });

    test("should wrap normal strings in single quotes", () => {
        const input = "simpletext";
        const escaped = client["escapeShellArg"](input);
        expect(escaped).toBe("'simpletext'");
    });

    test("should handle empty string", () => {
        const input = "";
        const escaped = client["escapeShellArg"](input);
        expect(escaped).toBe("''");
    });

    test("should escape strings with multiple single quotes", () => {
        const input = "it's a 'test'";
        const escaped = client["escapeShellArg"](input);
        expect(escaped).toBe("'it'\\''s a '\\''test'\\'''");
    });

    test("should escape special characters like $ or & correctly", () => {
        const input = "command & $VAR";
        const escaped = client["escapeShellArg"](input);
        expect(escaped).toBe("'command & $VAR'");
    });
});
