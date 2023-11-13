import nats, { Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("cannot access client before initializing");
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, {
      url,
    });

    return new Promise<void>((resolve, reject) => {
      this.client!.on("connect", () => {
        console.log("Connected to NATs");
        resolve();
      });

      this.client!.on("error", (err) => {
        console.log(err);
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
