import { StablesrailClient } from "../client";

export class VirtualAccount {
  constructor(private client: StablesrailClient) {}

  async get() {
    const { data } = await this.client.http.get("/getfintechvirtualaccount");
    return data;
  }

  async details(requestId: string) {
    const { data } = await this.client.http.post("/getvirtualaccount", {
      requestId,
    });
    return data;
  }
}
