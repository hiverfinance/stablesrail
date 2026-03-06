import { StablesrailClient } from "../client";

export class User {
  constructor(private client: StablesrailClient) {}

  async onboard(bvn: string) {
    const { data } = await this.client.http.post("/onboarduser", { bvn });
    return data;
  }
}
