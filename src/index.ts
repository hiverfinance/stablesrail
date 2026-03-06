import { StablesrailClient } from "./client";
import { User } from "./resources/user";

export class Stablesrail {
  public user: User;

  constructor(apiKey: string) {
    const client = new StablesrailClient(apiKey);

    this.user = new User(client);
  }
}
