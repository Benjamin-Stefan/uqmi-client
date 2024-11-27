[**UqmiClient v1.1.0**](../README.md)

***

[UqmiClient](../README.md) / ServiceType

# Type Alias: ServiceType

> **ServiceType**: `"wds"` \| `"nas"` \| `"uim"` \| `"sms"` \| `"voice"` \| `"dms"` \| `"gps"`

Enum-like type that defines various service types supported by the system.

ServiceType represents a set of valid services that can be interacted with. Each service type
is represented as a string and can be one of the following:
- "wds": Wireless data service
- "nas": Network access service
- "uim": User identity module service
- "sms": Short message service
- "voice": Voice service
- "dms": Device management service
- "gps": Global positioning service

## Example

```ts
const myService: ServiceType = "sms";
```

## Defined in

[types.ts:46](https://github.com/Benjamin-Stefan/uqmi-client/blob/bed165b1dfebe40d1bc32d916791573433b4c73b/src/types.ts#L46)
