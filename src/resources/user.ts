import { StablesrailClient } from "../client";

export class User {
  constructor(private client: StablesrailClient) {}

  async onboard(bvn: string) {
    const { data } = await this.client.http.post("/onboarduser", { bvn });
    return data;
  }

  async status(requestId: string) {
    const { data } = await this.client.http.post("/onboardstatus", {
      requestId,
    });
    return data;
  }

  async details(userId: string) {
    const { data } = await this.client.http.post("/getuserdetails", {
      userId,
    });
    return data;
  }

  async manage(body: { userId: string; active: boolean; reason: string }) {
    const { data } = await this.client.http.post("/manageuserstatus", body);
    return data;
  }

  async onramp(body: {
    owner?: string;
    amount: number;
    assetSwap: string;
    autoSwap?: boolean;
    userId: string;
    sweepToOfframp?: boolean;
  }) {
    const { data } = await this.client.http.post("/cngnonramp", body);
    return data;
  }

  offramp = {
    initiate: async (body: {
      userId: string;
      amount: number;
      accountNumber: string;
      bankCode: string;
      ticker: string;
    }) => {
      const { data } = await this.client.http.post("/cngnofframp", body);
      return data;
    },

    status: async (requestId: string) => {
      const { data } = await this.client.http.post(`/cngnofframpstatus`, {
        requestId,
      });
      return data;
    },
  };
}
