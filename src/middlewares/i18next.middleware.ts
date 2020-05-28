import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import i18Config from "../i18next.config";
import i18nextMiddleware from "i18next-express-middleware";
import i18next from "i18next";

@Middleware({ type: "before" })
export class I18NextMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next?: (err?: any) => any): any {
    i18nextMiddleware.handle(i18Config, {
      ignoreRoutes: ["/foo"], // or function(req, res, options, i18next) { /* return true to ignore */ }
      removeLngFromUrl: false
    });
    request.i18n = i18next;

    if (next) next();
  }
}
