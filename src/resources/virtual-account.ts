import { StablesrailClient } from "../client";

export class VirtualAccount {
  constructor(private client: StablesrailClient) {}

  async getfintech() {
    const { data } = await this.client.http.get("/getfintechvirtualaccount");
    return data;
  }

  async getdetails(requestId: string) {
    const { data } = await this.client.http.post("/getvirtualaccount", {
      requestId,
    });
    return data;
  }
}
