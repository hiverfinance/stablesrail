# @hiverfinance/stablesrail

**StablesRail SDK for Node.js, TypeScript, and Bun**

This SDK provides a clean, type-safe interface for interacting with the [StablesRail API](https://docs.stablesrail.io/), including onboarding users, managing wallets, and initiating transfers.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API](#api)
  - [Stablesrail](#stablesrail)
  - [stablesrail.user](#stablesrailuser)
    - [onboard](#onboardbvn-string)
    - [status](#statusrequestid-string)
    - [details](#detailsuserid-string)
    - [manage](#managebody)
    - [onramp](#onrampbody)
    - [offramp.initiate](#offrampinitiatebody)
    - [offramp.status](#offrampstatusrequestid-string)
  - [stablesrail.bank](#stablesrailbank)
    - [codes](#codes)
    - [list](#list)
    - [get](#getaccountid-string)
    - [add](#addbody)
    - [update](#updatebody)
    - [remove](#removeaccountid-string)
    - [virtualAccount](#virtualaccount)
    - [offramp.initiate](#offrampinitiatebody-1)
    - [offramp.status](#offrampstatusrequestid-string-1)
  - [stablesrail.wallet](#stablesrailwallet)
    - [list](#listuserid-string)
    - [get](#get)
    - [add](#addbody-1)
    - [update](#updatebody-1)
    - [remove](#removeaddress-string)
    - [migrate](#migratebody)
    - [withdraw](#withdrawbody)
  - [stablesrail.virtualAccount](#stablesrailvirtualaccount)
    - [get](#get-1)
    - [details](#detailsrequestid-string)
  - [stablesrail.fee](#stablesrailfee)
    - [get](#get-2)
    - [balance](#balance)
    - [manage](#managebody-1)
    - [withdrawal.request](#withdrawalrequestbody)
    - [withdrawal.history](#withdrawalhistoryparams)
    - [withdrawal.status](#withdrawalstatuswithdrawalid-string)
  - [stablesrail.transaction](#stablesrailtransaction)
    - [status](#statusuuid-string)
  - [stablesrail.config](#stablesrailconfig)
    - [get](#getfintechid-string)
    - [ip](#ipbody)
    - [apikey.regenerate](#apikeyregenerate)
    - [webhook.set](#webhooksetbody)
- [TypeScript Support](#typescript-support)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

Using **npm**:
```bash
npm install @hiverfinance/stablesrail
```

Using **pnpm**:
```bash
pnpm add @hiverfinance/stablesrail
```

Using **bun**:
```bash
bun add @hiverfinance/stablesrail
```

---

## Quick Start

```ts
import { Stablesrail } from "@hiverfinance/stablesrail";

const apiKey = process.env.STABLESRAIL_API_KEY!;
const stablesrail = new Stablesrail(apiKey);

// Onboard a user
const bvn = "12345678901";
const onboardedUser = await stablesrail.user.onboard(bvn);
console.log(onboardedUser);
```

---

## API

### `Stablesrail`

The main class. Instantiate with your API key:

```ts
const stablesrail = new Stablesrail(apiKey);
```

## `stablesrail.user`

The **User resource** allows you to onboard users, manage their status,
retrieve user details, and perform **onramp/offramp fiat--crypto
transactions**.

------------------------------------------------------------------------

### `onboard(bvn: string)`

Onboards a new user using their **Bank Verification Number (BVN)**.

``` ts
const result = await stablesrail.user.onboard("12345678901");
```

#### Parameters

| Name | Type   | Required | Description                                      |
|------|--------|----------|--------------------------------------------------|
| bvn  | string | Yes      | The user's BVN used for identity verification    |

------------------------------------------------------------------------

### `status(requestId: string)`

Checks the **status of a user onboarding request**.

``` ts
const result = await stablesrail.user.status("request_id");
```

#### Parameters

| Name      | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| requestId | string | Yes      | The onboarding request ID      |

------------------------------------------------------------------------

### `details(userId: string)`

Retrieves details for an onboarded user.

``` ts
const user = await stablesrail.user.details("user_id");
```

#### Parameters

| Name   | Type   | Required | Description                     |
|--------|--------|----------|---------------------------------|
| userId | string | Yes      | The unique user identifier      |

------------------------------------------------------------------------

### `manage(body)`

Enable or disable a user account.

``` ts
await stablesrail.user.manage({
  userId: "user_id",
  active: false,
  reason: "Compliance review"
});
```

#### Parameters

| Name   | Type    | Required | Description                               |
|--------|---------|----------|-------------------------------------------|
| userId | string  | Yes      | The user ID                               |
| active | boolean | Yes      | Whether the user account should be active |
| reason | string  | Yes      | Reason for the status change              |

------------------------------------------------------------------------

## Onramp & Offramp

These methods allow users to **convert between fiat (NGN) and crypto
assets**.

------------------------------------------------------------------------

### `onramp(body)`

Creates a **fiat → crypto transaction**.

``` ts
await stablesrail.user.onramp({
  userId: "user_id",
  amount: 5000,
  assetSwap: "USDT"
});
```

#### Parameters

| Name           | Type    | Required | Description                              |
|----------------|---------|----------|------------------------------------------|
| userId         | string  | Yes      | The user performing the transaction      |
| amount         | number  | Yes      | Amount in NGN                            |
| assetSwap      | string  | Yes      | Crypto asset to receive                  |
| owner          | string  | No       | Wallet owner reference                   |
| autoSwap       | boolean | No       | Automatically swap asset                 |
| sweepToOfframp | boolean | No       | Automatically sweep funds for offramp    |

------------------------------------------------------------------------

## Offramp

Offramp allows users to **convert crypto to fiat and withdraw to a bank
account**.

------------------------------------------------------------------------

### `offramp.initiate(body)`

Initiates a **crypto → fiat withdrawal**.

``` ts
await stablesrail.user.offramp.initiate({
  userId: "user_id",
  amount: 1000,
  accountNumber: "0123456789",
  bankCode: "058",
  ticker: "USDT"
});
```

#### Parameters

| Name          | Type   | Required | Description                       |
|---------------|--------|----------|-----------------------------------|
| userId        | string | Yes      | The user requesting the withdrawal |
| amount        | number | Yes      | Amount to withdraw                 |
| accountNumber | string | Yes      | Destination bank account           |
| bankCode      | string | Yes      | Bank code                          |
| ticker        | string | Yes      | Crypto asset ticker                |

------------------------------------------------------------------------

### `offramp.status(requestId: string)`

Checks the **status of an offramp transaction**.

``` ts
const status = await stablesrail.user.offramp.status("request_id");
```

#### Parameters

| Name      | Type   | Required | Description                              |
|-----------|--------|----------|------------------------------------------|
| requestId | string | Yes      | The offramp transaction request ID       |

------------------------------------------------------------------------

## `stablesrail.bank`

The **Bank resource** allows you to manage bank accounts, retrieve bank codes, access virtual accounts, and perform bank-related offramps.

---

### `codes()`

Retrieve all bank codes.

```ts
const bankCodes = await stablesrail.bank.codes();
```

---

### `list()`

List all bank accounts associated with the user.

```ts
const accounts = await stablesrail.bank.list();
```

---

### `get(accountId: string)`

Retrieve details of a specific bank account.

```ts
const account = await stablesrail.bank.get("account_id");
```

#### Parameters

| Name      | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| accountId | string | Yes      | The ID of the bank account |

---

### `add(body)`

Add a new bank account.

```ts
await stablesrail.bank.add({
  accountNumber: "0123456789",
  bankCode: "058",
  isDefault: true
});
```

#### Parameters

| Name          | Type    | Required | Description            |
| ------------- | ------- | -------- | ---------------------- |
| accountNumber | string  | Yes      | Bank account number    |
| bankCode      | string  | Yes      | Bank code              |
| isDefault     | boolean | No       | Set as default account |

---

### `update(body)`

Update an existing bank account.

```ts
await stablesrail.bank.update({
  accountId: "account_id",
  isDefault: true
});
```

#### Parameters

| Name      | Type    | Required | Description            |
| --------- | ------- | -------- | ---------------------- |
| accountId | string  | Yes      | Bank account ID        |
| isDefault | boolean | No       | Set as default account |

---

### `remove(accountId: string)`

Remove a bank account.

```ts
await stablesrail.bank.remove("account_id");
```

#### Parameters

| Name      | Type   | Required | Description                |
| --------- | ------ | -------- | -------------------------- |
| accountId | string | Yes      | The ID of the bank account |

---

### `virtualAccount()`

Get the fintech virtual account details.

```ts
const virtualAccount = await stablesrail.bank.virtualAccount();
```

---

### Offramp

Bank resource supports crypto → fiat withdrawals via offramps.

#### `offramp.initiate(body)`

Initiate a bank offramp transaction.

```ts
await stablesrail.bank.offramp.initiate({
  amount: 1000,
  bankAccountId: "account_id"
});
```

#### Parameters

| Name          | Type   | Required | Description        |
| ------------- | ------ | -------- | ------------------ |
| amount        | number | Yes      | Amount to withdraw |
| bankAccountId | string | Yes      | Bank account ID    |

#### `offramp.status(requestId: string)`

Check the status of a bank offramp transaction.

```ts
const status = await stablesrail.bank.offramp.status("request_id");
```

#### Parameters

| Name      | Type   | Required | Description            |
| --------- | ------ | -------- | ---------------------- |
| requestId | string | Yes      | The offramp request ID |

---
## `stablesrail.wallet`

The **Wallet resource** allows you to manage user wallets, add external wallets, update wallet status, remove wallets, migrate wallets, and initiate withdrawals.

---

### `list(userId: string)`

List all wallets associated with a user.

```ts
const wallets = await stablesrail.wallet.list("user_id");
```

#### Parameters

| Name   | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| userId | string | Yes      | The user ID |

---

### `get()`

Get the fintech wallet details.

```ts
const wallet = await stablesrail.wallet.get();
```

---

### `add(body)`

Add a new external wallet.

```ts
await stablesrail.wallet.add({
  address: "0x123...",
  label: "My Wallet",
  blockchain: "ethereum",
  type: "hot",
  purpose: "user_deposit",
  metadata: {
    custodian: "Binance",
    location: "NG",
    backupExists: true
  }
});
```

#### Parameters

| Name                  | Type    | Required | Description            |
| --------------------- | ------- | -------- | ---------------------- |
| address               | string  | Yes      | Wallet address         |
| label                 | string  | No       | Wallet label           |
| blockchain            | string  | Yes      | Blockchain name        |
| type                  | string  | Yes      | Wallet type (hot/cold) |
| purpose               | string  | No       | Purpose of the wallet  |
| metadata              | object  | No       | Additional metadata    |
| metadata.custodian    | string  | No       | Wallet custodian       |
| metadata.location     | string  | No       | Wallet location        |
| metadata.backupExists | boolean | No       | Backup existence flag  |

---

### `update(body)`

Update wallet status.

```ts
await stablesrail.wallet.update({
  address: "0x123...",
  status: "active"
});
```

#### Parameters

| Name    | Type   | Required | Description       |
| ------- | ------ | -------- | ----------------- |
| address | string | Yes      | Wallet address    |
| status  | string | Yes      | New wallet status |

---

### `remove(address: string)`

Remove an external wallet.

```ts
await stablesrail.wallet.remove("0x123...");
```

#### Parameters

| Name    | Type   | Required | Description    |
| ------- | ------ | -------- | -------------- |
| address | string | Yes      | Wallet address |

---

### `migrate(body)`

Migrate user wallets.

```ts
await stablesrail.wallet.migrate({
  userId: ["user1", "user2"],
  force: true
});
```

#### Parameters

| Name   | Type     | Required | Description             |
| ------ | -------- | -------- | ----------------------- |
| userId | string[] | Yes      | Array of user IDs       |
| force  | boolean  | No       | Force migration if true |

---

### `withdraw(body)`

Initiate a withdrawal from an internal wallet to an external wallet.

```ts
await stablesrail.wallet.withdraw({
  userId: "user1",
  internalWallet: "wallet_id",
  destinationWallet: "0x123...",
  amount: 1000,
  ticker: "USDC",
  network: "ethereum"
});
```

#### Parameters

| Name              | Type   | Required | Description                    |
| ----------------- | ------ | -------- | ------------------------------ |
| userId            | string | Yes      | User initiating the withdrawal |
| internalWallet    | string | Yes      | Internal wallet ID             |
| destinationWallet | string | Yes      | Destination wallet address     |
| amount            | number | Yes      | Amount to withdraw             |
| ticker            | string | Yes      | Asset ticker                   |
| network           | string | Yes      | Blockchain network             |

---
## `stablesrail.virtualAccount`

The **VirtualAccount resource** allows you to retrieve and manage virtual account details.

---

### `get()`

Retrieve the fintech virtual account details.

```ts
const virtualAccount = await stablesrail.virtualAccount.get();
```

---

### `details(requestId: string)`

Retrieve details of a specific virtual account by request ID.

```ts
const details = await stablesrail.virtualAccount.details("request_id");
```

#### Parameters

| Name      | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| requestId | string | Yes      | The virtual account request ID |

---
## `stablesrail.fee`

The **Fee resource** allows you to manage platform fees, check balances, and handle withdrawal requests.

---

### `get()`

Retrieve all fee settings.

```ts
const fees = await stablesrail.fee.get();
```

---

### `balance()`

Get accumulated fee balances.

```ts
const balance = await stablesrail.fee.balance();
```

---

### `manage(body)`

Manage fee settings for onramp and offramp transactions.

```ts
await stablesrail.fee.manage({
  onrampFee: { percentageFee: 0.5, capFee: 1000, enabled: true },
  offrampFee: { percentageFee: 1, capFee: 5000, enabled: true },
  metadata: { description: "Updated fees", notes: "Updated by admin", lastUpdatedBy: "admin" }
});
```

#### Parameters

| Name       | Type   | Required | Description                           |
| ---------- | ------ | -------- | ------------------------------------- |
| onrampFee  | object | Yes      | Onramp fee configuration              |
| offrampFee | object | Yes      | Offramp fee configuration             |
| metadata   | object | No       | Additional metadata about fee changes |

---

### `withdrawal`

Manage withdrawal requests.

#### `withdrawal.request(body)`

Request a withdrawal.

```ts
await stablesrail.fee.withdrawal.request({
  withdrawalId: "withdrawal1",
  bankCode: "058",
  accountName: "John Doe",
  amount: 1000,
  narration: "Fee withdrawal",
  metadata: { reference: "ref123", notes: "urgent" }
});
```

#### Parameters

| Name         | Type   | Required | Description                    |
| ------------ | ------ | -------- | ------------------------------ |
| withdrawalId | string | Yes      | Unique ID for the withdrawal   |
| bankCode     | string | Yes      | Bank code                      |
| accountName  | string | Yes      | Name on the bank account       |
| amount       | number | Yes      | Withdrawal amount              |
| narration    | string | No       | Optional narration for request |
| metadata     | object | No       | Additional metadata            |

---

#### `withdrawal.history(params?)`

Get withdrawal history.

```ts
const history = await stablesrail.fee.withdrawal.history({ limit: 10, status: "pending" });
```

#### Parameters

| Name   | Type   | Required | Description                 |
| ------ | ------ | -------- | --------------------------- |
| limit  | number | No       | Number of results to return |
| status | string | No       | Filter by status            |

---

#### `withdrawal.status(withdrawalId: string)`

Check the status of a withdrawal.

```ts
const status = await stablesrail.fee.withdrawal.status("withdrawal1");
```

#### Parameters

| Name         | Type   | Required | Description                 |
| ------------ | ------ | -------- | --------------------------- |
| withdrawalId | string | Yes      | The withdrawal ID to verify |
---
## `stablesrail.transaction`

The **Transaction resource** allows you to check the status of manual transactions.

---

### `status(uuid: string)`

Check the status of a transaction by its UUID.

```ts
const transactionStatus = await stablesrail.transaction.status("transaction_uuid");
```

#### Parameters

| Name | Type   | Required | Description    |
| ---- | ------ | -------- | -------------- |
| uuid | string | Yes      | The UUID of th |
---
## `stablesrail.config`

The **Config resource** allows you to manage fintech configuration, IP allowlists, API keys, and webhooks.

---

### `get(fintechId: string)`

Retrieve configuration for a specific fintech.

```ts
const config = await stablesrail.config.get("fintech_id");
```

#### Parameters

| Name      | Type   | Required | Description    |
| --------- | ------ | -------- | -------------- |
| fintechId | string | Yes      | The fintech ID |

---

### `ip(body)`

Manage IP allowlist.

```ts
await stablesrail.config.ip({
  action: "add",
  ipAddress: "192.168.0.1",
  description: "Office IP"
});
```

#### Parameters

| Name        | Type   | Required | Description                    |
| ----------- | ------ | -------- | ------------------------------ |
| action      | string | Yes      | Action to perform (add/remove) |
| ipAddress   | string | Yes      | IP address to manage           |
| description | string | No       | Optional description of the IP |

---

### `apikey.regenerate()`

Regenerate the API key.

```ts
const newKey = await stablesrail.config.apikey.regenerate();
```

---

### `webhook.set(body)`

Set or update webhook configuration.

```ts
await stablesrail.config.webhook.set({
  webhookUrl: "https://example.com/webhook",
  secret: "mysecret",
  enabled: true
});
```

#### Parameters

| Name       | Type    | Required | Description                   |
| ---------- | ------- | -------- | ----------------------------- |
| webhookUrl | string  | Yes      | URL for the webhook           |
| secret     | string  | No       | Secret for webhook signature  |
| enabled    | boolean | Yes      | Enable or disable the webhook |
---
## TypeScript Support

Fully typed:

```ts
import type { Stablesrail } from "@hiverfinance/stablesrail";

const stablesrail: Stablesrail;
```

You get **autocomplete, type checking, and safer API usage**.

---

## Contributing

1. Fork the repository  
2. Run `pnpm install`  
3. Make your changes in `src/`  
4. Submit a pull request

---

## License

MIT © Hiver Finance
