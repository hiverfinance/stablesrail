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

### `stablesrail.user`

- **`onboard(bvn: string)`** → Onboards a user using their BVN.

```ts
const result = await stablesrail.user.onboard("12345678901");
```

*(Additional methods like `getUser`, `verifyUser` can be added in future releases.)*

---

## TypeScript Support

Fully typed:

```ts
import type { Stablesrail } from "@hiverfinance/stablesrail";

const stablesrail: Stablesrail;
```

You get **autocomplete, type checking, and safer API usage**.

---

## Project Structure

```
src/
 ├─ client.ts        # HTTP client wrapper
 ├─ resources/
 │   └─ user.ts      # User-related API methods
 └─ index.ts         # Main SDK entrypoint

dist/                # Compiled JS for npm
```

---

## Contributing

1. Fork the repository  
2. Run `pnpm install`  
3. Make your changes in `src/`  
4. Submit a pull request

---

## Publishing a new version

1. Update version:
```bash
npm version patch   # or minor / major
```
2. Build:
```bash
pnpm build
```
3. Publish:
```bash
npm publish --access public
```

---

## License

MIT © Hiver Finance
