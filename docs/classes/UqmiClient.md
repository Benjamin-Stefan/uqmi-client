[**UqmiClient v1.1.0**](../README.md)

***

[UqmiClient](../README.md) / UqmiClient

# Class: UqmiClient

Class representing a Uqmi client for managing network-related commands via SSH.

## Constructors

### new UqmiClient()

> **new UqmiClient**(`device`, `sshOptions`, `uqmiClientOptions`?): [`UqmiClient`](UqmiClient.md)

Creates an instance of UqmiClient.

#### Parameters

##### device

`string`

The device identifier.

##### sshOptions

[`SSHOptions`](../interfaces/SSHOptions.md)

SSH options for connection.

##### uqmiClientOptions?

[`UqmiClientOptions`](../interfaces/UqmiClientOptions.md)

Optional UqmiClient options.

#### Returns

[`UqmiClient`](UqmiClient.md)

#### Throws

If the device is not specified.

#### Defined in

[uqmiClient.ts:19](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L19)

## Methods

### changePin1()

> **changePin1**(`oldPin`, `newPin`): `Promise`\<`string`\>

Changes PIN1.

#### Parameters

##### oldPin

`string`

The old PIN1.

##### newPin

`string`

The new PIN1.

#### Returns

`Promise`\<`string`\>

Confirmation of the PIN1 change.

#### Defined in

[uqmiClient.ts:239](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L239)

***

### changePin2()

> **changePin2**(`oldPin`, `newPin`): `Promise`\<`string`\>

Changes PIN2.

#### Parameters

##### oldPin

`string`

The old PIN2.

##### newPin

`string`

The new PIN2.

#### Returns

`Promise`\<`string`\>

Confirmation of the PIN2 change.

#### Defined in

[uqmiClient.ts:249](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L249)

***

### deleteMessage()

> **deleteMessage**(`id`, `storage`?): `Promise`\<`string`\>

Deletes an SMS message.

#### Parameters

##### id

`number`

The ID of the SMS message to delete.

##### storage?

The storage location of the SMS messages.

`"sim"` | `"me"`

#### Returns

`Promise`\<`string`\>

Confirmation of the SMS deletion.

#### Defined in

[uqmiClient.ts:431](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L431)

***

### getCapabilities()

> **getCapabilities**(): `Promise`\<`string`\>

Retrieves the device capabilities.

#### Returns

`Promise`\<`string`\>

The device capabilities.

#### Defined in

[uqmiClient.ts:183](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L183)

***

### getClientId()

> **getClientId**(`serviceName`): `Promise`\<`string`\>

Retrieves the client ID for a specific service.

#### Parameters

##### serviceName

`string`

The name of the service.

#### Returns

`Promise`\<`string`\>

The client ID.

#### Defined in

[uqmiClient.ts:104](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L104)

***

### getCurrentSettings()

> **getCurrentSettings**(): `Promise`\<`string`\>

Retrieves the current network settings.

#### Returns

`Promise`\<`string`\>

The current network settings.

#### Defined in

[uqmiClient.ts:175](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L175)

***

### getDataFormat()

> **getDataFormat**(): `Promise`\<`string`\>

Retrieves the data format.

#### Returns

`Promise`\<`string`\>

The current data format.

#### Defined in

[uqmiClient.ts:484](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L484)

***

### getDataStatus()

> **getDataStatus**(): `Promise`\<`string`\>

Retrieves the current data status.

#### Returns

`Promise`\<`string`\>

The current data status.

#### Defined in

[uqmiClient.ts:149](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L149)

***

### getDeviceOperatingMode()

> **getDeviceOperatingMode**(): `Promise`\<`string`\>

Retrieves the current device operating mode.

#### Returns

`Promise`\<`string`\>

The device operating mode.

#### Defined in

[uqmiClient.ts:317](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L317)

***

### getICCID()

> **getICCID**(): `Promise`\<`string`\>

Retrieves the ICCID (Integrated Circuit Card Identifier).

#### Returns

`Promise`\<`string`\>

The ICCID.

#### Defined in

[uqmiClient.ts:277](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L277)

***

### getIMEI()

> **getIMEI**(): `Promise`\<`string`\>

Retrieves the IMEI (International Mobile Equipment Identity).

#### Returns

`Promise`\<`string`\>

The IMEI.

#### Defined in

[uqmiClient.ts:293](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L293)

***

### getIMSI()

> **getIMSI**(): `Promise`\<`string`\>

Retrieves the IMSI (International Mobile Subscriber Identity).

#### Returns

`Promise`\<`string`\>

The IMSI.

#### Defined in

[uqmiClient.ts:285](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L285)

***

### getMessage()

> **getMessage**(`id`, `storage`?): `Promise`\<`string`\>

Retrieves an SMS message.

#### Parameters

##### id

`number`

The ID of the SMS message to retrieve.

##### storage?

The storage location of the SMS messages.

`"sim"` | `"me"`

#### Returns

`Promise`\<`string`\>

The content of the SMS message.

#### Defined in

[uqmiClient.ts:441](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L441)

***

### getMSISDN()

> **getMSISDN**(): `Promise`\<`string`\>

Retrieves the MSISDN (Mobile Station International Subscriber Directory Number).

#### Returns

`Promise`\<`string`\>

The MSISDN.

#### Defined in

[uqmiClient.ts:301](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L301)

***

### getPinStatus()

> **getPinStatus**(): `Promise`\<`string`\>

Retrieves the PIN status.

#### Returns

`Promise`\<`string`\>

The PIN status.

#### Defined in

[uqmiClient.ts:191](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L191)

***

### getPLMN()

> **getPLMN**(): `Promise`\<`string`\>

Retrieves the PLMN (Public Land Mobile Network).

#### Returns

`Promise`\<`string`\>

The PLMN information.

#### Defined in

[uqmiClient.ts:404](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L404)

***

### getRawMessage()

> **getRawMessage**(`id`, `storage`?): `Promise`\<`string`\>

Retrieves the raw content of an SMS message.

#### Parameters

##### id

`number`

The ID of the SMS message to retrieve.

##### storage?

The storage location of the SMS messages.

`"sim"` | `"me"`

#### Returns

`Promise`\<`string`\>

The raw content of the SMS message.

#### Defined in

[uqmiClient.ts:451](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L451)

***

### getServingSystem()

> **getServingSystem**(): `Promise`\<`string`\>

Retrieves the serving system information.

#### Returns

`Promise`\<`string`\>

The current serving system.

#### Defined in

[uqmiClient.ts:492](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L492)

***

### getSignalInfo()

> **getSignalInfo**(): `Promise`\<`string`\>

Retrieves signal information.

#### Returns

`Promise`\<`string`\>

The signal information.

#### Defined in

[uqmiClient.ts:412](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L412)

***

### getSIMState()

> **getSIMState**(): `Promise`\<`string`\>

Retrieves the SIM card state.

#### Returns

`Promise`\<`string`\>

The SIM state.

#### Defined in

[uqmiClient.ts:360](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L360)

***

### getVersions()

> **getVersions**(): `Promise`\<`string`\>

Retrieves the service versions.

#### Returns

`Promise`\<`string`\>

The service versions.

#### Defined in

[uqmiClient.ts:85](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L85)

***

### listMessages()

> **listMessages**(`storage`?): `Promise`\<`string`\>

Lists SMS messages.

#### Parameters

##### storage?

The storage location of the SMS messages.

`"sim"` | `"me"`

#### Returns

`Promise`\<`string`\>

The list of SMS messages.

#### Defined in

[uqmiClient.ts:421](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L421)

***

### networkRegister()

> **networkRegister**(): `Promise`\<`string`\>

Initiates network registration.

#### Returns

`Promise`\<`string`\>

Confirmation of the network registration.

#### Defined in

[uqmiClient.ts:386](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L386)

***

### networkScan()

> **networkScan**(): `Promise`\<`string`\>

Performs a network scan.

#### Returns

`Promise`\<`string`\>

The results of the network scan.

#### Defined in

[uqmiClient.ts:378](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L378)

***

### resetDMS()

> **resetDMS**(): `Promise`\<`string`\>

Resets the DMS service.

#### Returns

`Promise`\<`string`\>

Confirmation of the DMS reset.

#### Defined in

[uqmiClient.ts:309](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L309)

***

### sendMessage()

> **sendMessage**(`destinationNumber`, `message`, `flash`?, `smsc`?): `Promise`\<`string`\>

Sends an SMS message.

#### Parameters

##### destinationNumber

`string`

The destination phone number.

##### message

`string`

The content of the SMS message.

##### flash?

`boolean` = `false`

Whether to send the SMS as a flash message.

##### smsc?

`string`

The SMS service center number.

#### Returns

`Promise`\<`string`\>

Confirmation of the SMS sending.

#### Defined in

[uqmiClient.ts:463](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L463)

***

### setAutoconnect()

> **setAutoconnect**(`value`): `Promise`\<`string`\>

Sets the autoconnect feature.

#### Parameters

##### value

The autoconnect state to set.

`"disabled"` | `"enabled"` | `"paused"`

#### Returns

`Promise`\<`string`\>

Confirmation of the autoconnect state change.

#### Defined in

[uqmiClient.ts:167](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L167)

***

### setClientId()

> **setClientId**(`serviceName`, `clientId`): `Promise`\<`string`\>

Sets the client ID for a specific service.

#### Parameters

##### serviceName

`string`

The name of the service.

##### clientId

`string`

The client ID to set.

#### Returns

`Promise`\<`string`\>

Confirmation of the command execution.

#### Defined in

[uqmiClient.ts:95](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L95)

***

### setDataFormat()

> **setDataFormat**(`type`): `Promise`\<`string`\>

Sets the data format.

#### Parameters

##### type

The data format to set.

`"802.3"` | `"raw-ip"`

#### Returns

`Promise`\<`string`\>

Confirmation of the data format setting.

#### Defined in

[uqmiClient.ts:476](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L476)

***

### setDeviceOperatingMode()

> **setDeviceOperatingMode**(`mode`): `Promise`\<`string`\>

Sets the device operating mode.

#### Parameters

##### mode

The mode to set.

`"online"` | `"low_power"` | `"factory_test"` | `"offline"` | `"reset"` | `"shutting_down"` | `"persistent_low_power"` | `"mode_only_low_power"`

#### Returns

`Promise`\<`string`\>

Confirmation of the mode change.

#### Defined in

[uqmiClient.ts:326](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L326)

***

### setFCCAuth()

> **setFCCAuth**(): `Promise`\<`string`\>

Executes FCC authorization.

#### Returns

`Promise`\<`string`\>

Confirmation of the FCC authorization.

#### Defined in

[uqmiClient.ts:334](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L334)

***

### setIPFamily()

> **setIPFamily**(`ipFamily`): `Promise`\<`string`\>

Sets the IP family.

#### Parameters

##### ipFamily

The IP family to set.

`"ipv4"` | `"ipv6"` | `"unspecified"`

#### Returns

`Promise`\<`string`\>

Confirmation of the IP family change.

#### Defined in

[uqmiClient.ts:158](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L158)

***

### setNetworkModes()

> **setNetworkModes**(`modes`): `Promise`\<`string`\>

Sets the network modes.

#### Parameters

##### modes

`string`[]

The network modes to set.

#### Returns

`Promise`\<`string`\>

Confirmation of the network mode setting.

#### Defined in

[uqmiClient.ts:369](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L369)

***

### setPin1Protection()

> **setPin1Protection**(`state`, `pin`): `Promise`\<`string`\>

Sets the protection for PIN1.

#### Parameters

##### state

The protection state for PIN1.

`"disabled"` | `"enabled"`

##### pin

`string`

The PIN1 to protect.

#### Returns

`Promise`\<`string`\>

Confirmation of the PIN1 protection change.

#### Defined in

[uqmiClient.ts:219](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L219)

***

### setPin2Protection()

> **setPin2Protection**(`state`, `pin2`): `Promise`\<`string`\>

Sets the protection for PIN2.

#### Parameters

##### state

The protection state for PIN2.

`"disabled"` | `"enabled"`

##### pin2

`string`

The PIN2 to protect.

#### Returns

`Promise`\<`string`\>

Confirmation of the PIN2 protection change.

#### Defined in

[uqmiClient.ts:229](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L229)

***

### setPLMN()

> **setPLMN**(`mcc`, `mnc`): `Promise`\<`string`\>

Sets the PLMN (Public Land Mobile Network).

#### Parameters

##### mcc

`string`

The Mobile Country Code.

##### mnc

`string`

The Mobile Network Code.

#### Returns

`Promise`\<`string`\>

Confirmation of the PLMN setting.

#### Defined in

[uqmiClient.ts:396](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L396)

***

### startNetwork()

> **startNetwork**(`apn`, `authType`, `username`?, `password`?, `ipFamily`?): `Promise`\<`string`\>

Starts the network connection with the specified parameters.

#### Parameters

##### apn

`string`

The APN (Access Point Name) to use.

##### authType

The authentication type.

`"pap"` | `"chap"` | `"both"` | `"none"`

##### username?

`string`

Optional username for authentication.

##### password?

`string`

Optional password for authentication.

##### ipFamily?

The IP family to use.

`"ipv4"` | `"ipv6"` | `"unspecified"`

#### Returns

`Promise`\<`string`\>

Confirmation of the network start.

#### Defined in

[uqmiClient.ts:125](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L125)

***

### stopNetwork()

> **stopNetwork**(`pdh`, `autoconnect`?): `Promise`\<`string`\>

Stops the network connection.

#### Parameters

##### pdh

`string`

The PDH (Packet Data Handler).

##### autoconnect?

`boolean` = `false`

Whether to enable autoconnect after stopping.

#### Returns

`Promise`\<`string`\>

Confirmation of the network stop.

#### Defined in

[uqmiClient.ts:139](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L139)

***

### sync()

> **sync**(): `Promise`\<`string`\>

Synchronizes all client IDs.

#### Returns

`Promise`\<`string`\>

Confirmation of the synchronization.

#### Defined in

[uqmiClient.ts:112](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L112)

***

### uimVerifyPin1()

> **uimVerifyPin1**(`pin`): `Promise`\<`string`\>

Verifies PIN1 for new devices.

#### Parameters

##### pin

`string`

The PIN1 to verify.

#### Returns

`Promise`\<`string`\>

Confirmation of the PIN1 verification.

#### Defined in

[uqmiClient.ts:343](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L343)

***

### uimVerifyPin2()

> **uimVerifyPin2**(`pin`): `Promise`\<`string`\>

Verifies PIN2 for new devices.

#### Parameters

##### pin

`string`

The PIN2 to verify.

#### Returns

`Promise`\<`string`\>

Confirmation of the PIN2 verification.

#### Defined in

[uqmiClient.ts:352](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L352)

***

### unblockPin1()

> **unblockPin1**(`puk`, `newPin`): `Promise`\<`string`\>

Unblocks PIN1 using PUK.

#### Parameters

##### puk

`string`

The PUK to unblock PIN1.

##### newPin

`string`

The new PIN1 to set.

#### Returns

`Promise`\<`string`\>

Confirmation of the PIN1 unblock.

#### Defined in

[uqmiClient.ts:259](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L259)

***

### unblockPin2()

> **unblockPin2**(`puk`, `newPin`): `Promise`\<`string`\>

Unblocks PIN2 using PUK.

#### Parameters

##### puk

`string`

The PUK to unblock PIN2.

##### newPin

`string`

The new PIN2 to set.

#### Returns

`Promise`\<`string`\>

Confirmation of the PIN2 unblock.

#### Defined in

[uqmiClient.ts:269](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L269)

***

### verifyPin1()

> **verifyPin1**(`pin`): `Promise`\<`string`\>

Verifies PIN1.

#### Parameters

##### pin

`string`

The PIN1 to verify.

#### Returns

`Promise`\<`string`\>

Confirmation of the PIN1 verification.

#### Defined in

[uqmiClient.ts:200](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L200)

***

### verifyPin2()

> **verifyPin2**(`pin`): `Promise`\<`string`\>

Verifies PIN2.

#### Parameters

##### pin

`string`

The PIN2 to verify.

#### Returns

`Promise`\<`string`\>

Confirmation of the PIN2 verification.

#### Defined in

[uqmiClient.ts:209](https://github.com/Benjamin-Stefan/uqmi-client/blob/77e1ab46947638604a5a52f0e283e656508ff4c1/src/uqmiClient.ts#L209)
