import { I18next } from "i18next-express-middleware";

export interface IRequest extends Request {
  i18n: I18next;
}
