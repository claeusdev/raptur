import { RapturRequest } from "./request";
import { RapturResponse } from "./response";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type RouteHandler = (req: RapturRequest, res: RapturResponse) => void | Promise<void>;

export interface Route {
  method: HttpMethod;
  path: string;
  handler: RouteHandler;
}


