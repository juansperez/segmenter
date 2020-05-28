import i18next from "i18next";
import i18nextMiddleware from "i18next-express-middleware";
import Backend from "i18next-node-fs-backend";

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + "/locales/{{lng}}/{{ns}}.json"
    },
    detection: {
      order: ["querystring", "cookie", "header"],
      caches: ["cookie"]
    },
    fallbackLng: ["en-US", "es-CO"],
    preload: ["en-US", "es-CO"]
  });

const i18Config = i18next;

export default i18Config;
