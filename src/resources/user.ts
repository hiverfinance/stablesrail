import { StablesrailClient } from "../client";

export class User {
  constructor(private client: StablesrailClient) {}

  async onboard(bvn: string) {
    const { data } = await this.client.http.post("/onboarduser", { bvn });
    return data;
  }

  async onboardstatus(requestId: string) {
    const { data } = await this.client.http.post("/onboardstatus", {
      requestId,
    });
    return data;
  }

  async getdetails(userId: string) {
    const { data } = await this.client.http.post("/getuserdetails", {
      userId,
    });
    return data;
  }

  async managestatus(body: {
    userId: string;
    boolean: number;
    reason: string;
  }) {
    const { data } = await this.client.http.post("/manageuserstatus", body);
    return data;
  }
}
