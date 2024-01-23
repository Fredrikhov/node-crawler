import { removeProtocolFromUrl, getUrlFromHTML } from "./crawl";

console.log(
  getUrlFromHTML(
    `<html><body><ul><li><a href="https://hovweb.org"></a></li></ul><body></html>`,
    removeProtocolFromUrl("https://hovweb.org")
  )
);
