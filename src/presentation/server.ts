import express from 'express';

interface IOptions {
  port?: number;
}

export class Server {
  public readonly app = express();
  private readonly port: number;

  constructor(options: IOptions) {
    const { port = 3100 } = options;
    this.port = port;
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`**==== Server running on port ${this.port} ====**`);
    });
  }
}
