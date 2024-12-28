import http from "node:http"

export class RapturResponse {
  private sent = false;

  constructor(private res: http.ServerResponse) { }

  status(code: number): RapturResponse {
    this.res.statusCode = code;
    return this;
  }

  json(data: any): void {
    if (this.sent) return;
    this.sent = true;
    this.res.setHeader('Content-Type', 'application/json');
    this.res.end(JSON.stringify(data));
  }

  send(data: string): void {
    if (this.sent) return;
    this.sent = true;
    this.res.setHeader('Content-Type', 'text/plain');
    this.res.end(data);
  }

  setHeader(name: string, value: string): RapturResponse {
    this.res.setHeader(name, value);
    return this;
  }
}

