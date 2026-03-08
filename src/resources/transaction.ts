import { StablesrailClient } from "../client";

export class Transaction {
  constructor(private client: StablesrailClient) {}

  async status(uuid: string) {
    const { data } = await this.client.http.get(
      `/manualstatusrecovery?uuid=${uuid}`,
    );
    return data;
  }
}
