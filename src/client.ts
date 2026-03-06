import axios from "axios";
import type { AxiosInstance } from "axios";

export class StablesrailClient {
  public http: AxiosInstance;

  constructor(apiKey: string) {
    this.http = axios.create({
      baseURL: "https://beta.stablesrail.io/v1",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
  }
}
