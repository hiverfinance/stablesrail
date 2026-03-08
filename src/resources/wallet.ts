import { StablesrailClient } from "../client";

export class Wallet {
  constructor(private client: StablesrailClient) {}

  async list(userId: string) {
    const { data } = await this.client.http.post("/listuserwallets", {
      userId,
    });
    return data;
  }

  async get() {
    const { data } = await this.client.http.get(`/getfintechwallet`);
    return data;
  }

  async add(body: {
    address: string;
    label?: string;
    blockchain: string;
    type: string;
    purpose?: string;
    metadata?: {
      custodian?: string;
      location?: string;
      backupExists?: boolean;
    };
  }) {
    const { data } = await this.client.http.post("/addexternalwallet", body);
    return data;
  }

  async update(body: { address: string; status: string }) {
    const { data } = await this.client.http.put(
      "/updateexternalwalletstatus",
      body,
    );
    return data;
  }

  async remove(address: string) {
    const { data } = await this.client.http.delete("/removeexternalwallet", {
      data: { address },
    });

    return data;
  }

  async migrate(body: { userId: string[]; force?: boolean }) {
    const { data } = await this.client.http.post("/migrateuserwallets", body);
    return data;
  }

  async withdraw(body: {
    userId: string;
    internalWallet: string;
    destinationWallet: string;
    amount: number;
    ticker: string;
    network: string;
  }) {
    const { data } = await this.client.http.post("/initiateofframp", body);
    return data;
  }
}
