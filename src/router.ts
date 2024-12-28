import http from "node:http"
import { URL } from 'node:url';

import { RapturRequest } from "./request"
import { RapturResponse } from "./response"
import { HttpMethod, Route, RouteHandler } from "./types";


export class Raptur {
  private routes: Route[] = [];
  private server: http.Server;

  constructor(private port: number = 3000) {
    this.server = http.createServer(this.handleRequest.bind(this));
    console.log(`
         __    _                   
        / _)  / \\        /\\  /\\    
       /(_)(  \\_/       /  \\/  \\   
      (____)\  _    ___/   /\\   \\  
           U  (_)  (___/   \\/   /  
               _    _  \\_      /   
              (____(__  \\_____/    
            
    🦖 Raptur Router initialized`);
  }

  get(path: string, handler: RouteHandler): Raptur {
    this.addRoute('GET', path, handler);
    return this;
  }

  post(path: string, handler: RouteHandler): Raptur {
    this.addRoute('POST', path, handler);
    return this;
  }

  put(path: string, handler: RouteHandler): Raptur {
    this.addRoute('PUT', path, handler);
    return this;
  }

  delete(path: string, handler: RouteHandler): Raptur {
    this.addRoute('DELETE', path, handler);
    return this;
  }

  private addRoute(method: HttpMethod, path: string, handler: RouteHandler): void {
    this.routes.push({ method, path, handler });
    console.log(`🦕 Route registered: ${method} ${path}`);
  }

  private extractParams(routePath: string, requestPath: string): Record<string, string> | null {
    const routeParts = routePath.split('/');
    const requestParts = requestPath.split('/');

    if (routeParts.length !== requestParts.length) {
      return null;
    }

    const params: Record<string, string> = {};

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].slice(1);
        params[paramName] = requestParts[i];
      } else if (routeParts[i] !== requestParts[i]) {
        return null;
      }
    }

    return params;
  }

  private async handleRequest(nodeReq: http.IncomingMessage, nodeRes: http.ServerResponse) {
    const method = nodeReq.method as HttpMethod;
    const url = new URL(nodeReq.url || '', `http://${nodeReq.headers.host}`);

    const req = new RapturRequest(nodeReq, url);
    const res = new RapturResponse(nodeRes);

    for (const route of this.routes) {
      if (route.method === method) {
        const params = this.extractParams(route.path, url.pathname);
        if (params) {
          req.params = params;
          req.query = Object.fromEntries(url.searchParams);
          try {
            await route.handler(req, res);
            return;
          } catch (error) {
            console.error('🚨 Route handler error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
        }
      }
    }

    res.status(404).json({ error: 'Not Found' });
  }

  start(callback?: () => void): void {
    this.server.listen(this.port, () => {
      console.log(`🦖 Raptur is hunting on port ${this.port}`);
      callback?.();
    });
  }
}
