# @hiverfinance/stablesrail

**StablesRail SDK for Node.js, TypeScript, and Bun**

This SDK provides a clean, type-safe interface for interacting with the [StablesRail API](https://docs.stablesrail.io/), including onboarding users, managing wallets, and initiating transfers.

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

  Name   Type     Required   Description
  ------ -------- ---------- -----------------------------------------------
  bvn    string   Yes        The user's BVN used for identity verification

------------------------------------------------------------------------

### `status(requestId: string)`

Checks the **status of a user onboarding request**.

``` ts
const result = await stablesrail.user.status("request_id");
```

#### Parameters

  Name        Type     Required   Description
  ----------- -------- ---------- ---------------------------
  requestId   string   Yes        The onboarding request ID

------------------------------------------------------------------------

### `details(userId: string)`

Retrieves details for an onboarded user.

``` ts
const user = await stablesrail.user.details("user_id");
```

#### Parameters

  Name     Type     Required   Description
  -------- -------- ---------- ----------------------------
  userId   string   Yes        The unique user identifier

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

  Name     Type      Required   Description
  -------- --------- ---------- -------------------------------------------
  userId   string    Yes        The user ID
  active   boolean   Yes        Whether the user account should be active
  reason   string    Yes        Reason for the status change

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

  -----------------------------------------------------------------------
  Name              Type              Required          Description
  ----------------- ----------------- ----------------- -----------------
  userId            string            Yes               The user
                                                        performing the
                                                        transaction

  amount            number            Yes               Amount in NGN

  assetSwap         string            Yes               Crypto asset to
                                                        receive

  owner             string            No                Wallet owner
                                                        reference

  autoSwap          boolean           No                Automatically
                                                        swap asset

  sweepToOfframp    boolean           No                Automatically
                                                        sweep funds for
                                                        offramp
  -----------------------------------------------------------------------

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

  Name            Type     Required   Description
  --------------- -------- ---------- ------------------------------------
  userId          string   Yes        The user requesting the withdrawal
  amount          number   Yes        Amount to withdraw
  accountNumber   string   Yes        Destination bank account
  bankCode        string   Yes        Bank code
  ticker          string   Yes        Crypto asset ticker

------------------------------------------------------------------------

### `offramp.status(requestId: string)`

Checks the **status of an offramp transaction**.

``` ts
const status = await stablesrail.user.offramp.status("request_id");
```

#### Parameters

  Name        Type     Required   Description
  ----------- -------- ---------- ------------------------------------
  requestId   string   Yes        The offramp transaction request ID

------------------------------------------------------------------------

## Example Flow

Example of a full user lifecycle:

``` ts
// Onboard user
const user = await stablesrail.user.onboard("12345678901");

// Check onboarding status
await stablesrail.user.status(user.requestId);

// Get user details
await stablesrail.user.details(user.userId);

// Onramp funds
await stablesrail.user.onramp({
  userId: user.userId,
  amount: 5000,
  assetSwap: "USDT"
});

// Withdraw funds
await stablesrail.user.offramp.initiate({
  userId: user.userId,
  amount: 1000,
  accountNumber: "0123456789",
  bankCode: "058",
  ticker: "USDT"
});
```

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
