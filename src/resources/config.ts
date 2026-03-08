import { StablesrailClient } from "../client";

export class Config {
  constructor(private client: StablesrailClient) {}

  async get(fintechId: string) {
    const { data } = await this.client.http.get(
      `/config?fintechId==${fintechId}`,
    );
    return data;
  }

  async ip(body: { action: string; ipAddress: string; description?: string }) {
    const { data } = await this.client.http.post(`/manageipallowlist`);
    return data;
  }

  apikey = {
    regenerate: async () => {
      const { data } = await this.client.http.get(`/regenerateapikey`);
      return data;
    },
  };

  webhook = {
    set: async (body: {
      webhookUrl: string;
      secret?: string;
      enabled: boolean;
    }) => {
      const { data } = await this.client.http.post(`/setwebhook`);
      return data;
    },
  };
}
