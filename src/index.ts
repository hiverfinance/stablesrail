import { StablesrailClient } from "./client";
import { User } from "./resources/user";
import { VirtualAccount } from "./resources/virtual-account";
import { Bank } from "./resources/bank";
import { Fee } from "./resources/fee";
import { Wallet } from "./resources/wallet";
import { Config } from "./resources/config";
import { Transaction } from "./resources/transaction";

export class Stablesrail {
  public user!: User;
  public virtualAccount!: VirtualAccount;
  public bank!: Bank;
  public fee!: Fee;
  public wallet!: Wallet;
  public config!: Config;
  public transaction!: Transaction;

  private client: StablesrailClient;

  constructor(apiKey: string) {
    this.client = new StablesrailClient(apiKey);

    const resources = {
      user: User,
      virtualAccount: VirtualAccount,
      bank: Bank,
      fee: Fee,
      wallet: Wallet,
      config: Config,
      transaction: Transaction,
    };

    for (const [key, Resource] of Object.entries(resources)) {
      // @ts-ignore
      this[key] = new Resource(this.client);
    }
  }
}
