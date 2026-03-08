import { StablesrailClient } from "../client";

export class Bank {
  constructor(private client: StablesrailClient) {}

  async codes() {
    const { data } = await this.client.http.post("/getbankscode");
    return data;
  }

  async list() {
    const { data } = await this.client.http.get("/listbankaccounts");
    return data;
  }

  async get(accountId: string) {
    const { data } = await this.client.http.get(
      `/getbankaccount?accountId=${accountId}`,
    );
    return data;
  }

  async add(body: {
    accountNumber: string;
    bankCode: string;
    isDefault?: boolean;
  }) {
    const { data } = await this.client.http.post("/addbankaccount", body);
    return data;
  }

  async update(body: { accountId: string; isDefault?: boolean }) {
    const { data } = await this.client.http.put("/updatebankaccount", body);
    return data;
  }

  async remove(accountId: string) {
    const { data } = await this.client.http.delete(
      `/deletebankaccount?accountId=${accountId}`,
    );
    return data;
  }

  async virtualAccount() {
    const { data } = await this.client.http.get(`/getfintechvirtualaccount`);
    return data;
  }

  offramp = {
    initiate: async (body: { amount: number; bankAccountId: string }) => {
      const { data } = await this.client.http.post("/initiateofframp", body);
      return data;
    },

    status: async (requestId: string) => {
      const { data } = await this.client.http.get(
        `/getofframpstatus?requestId=${requestId}`,
      );
      return data;
    },
  };
}
