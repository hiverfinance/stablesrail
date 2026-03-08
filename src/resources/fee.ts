import { StablesrailClient } from "../client";

export class Fee {
  constructor(private client: StablesrailClient) {}

  async get() {
    const { data } = await this.client.http.get(`/getfees`);
    return data;
  }

  async balance() {
    const { data } = await this.client.http.get(`/getaccumulatedfees`);
    return data;
  }

  async manage(body: {
    onrampFee: { percentageFee: number; capFee: number; enabled: boolean };
    offrampFee: { percentageFee: number; capFee: number; enabled: boolean };
    metadata?: { description?: string; notes?: string; lastUpdatedBy?: string };
  }) {
    const { data } = await this.client.http.put("/managefees", body);
    return data;
  }

  withdrawal = {
    request: async (body: {
      withdrawalId: string;
      bankCode: string;
      accountName: string;
      amount: number;
      narration?: string;
      metadata?: {
        reference?: string;
        notes?: string;
      };
    }) => {
      const { data } = await this.client.http.post(
        `/fintechrequestwithdrawal`,
        body,
      );
      return data;
    },
    history: async (params?: { limit?: number; status?: string }) => {
      const { data } = await this.client.http.get("/getwithdrawalhistory", {
        params: {
          limit: 20,
          status: "completed",
          ...params,
        },
      });
      return data;
    },
    status: async (withdrawalId: string) => {
      const { data } = await this.client.http.post(
        `/verify-withdrawal?limit=20&status=completed`,
        {
          withdrawalId,
        },
      );
      return data;
    },
  };
}
