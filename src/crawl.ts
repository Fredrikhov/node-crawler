import { load } from "cheerio";

export const removeProtocolFromUrl = (input: string): string => {
  const url = new URL(input);
  const hostPath = `${url.hostname}${url.pathname}`;
  if (hostPath.endsWith("/")) {
    return hostPath.slice(0, -1);
  } else {
    return hostPath;
  }
};

export const getUrlFromHTML = (htmlbody: string, baseURL: string) => {
  const urls: string[] = [];
  const $ = load(htmlbody);
  $("a").map((i, link) => {
    if ($(link).attr("href")?.startsWith("/")) {
      try {
        const urlObj = new URL(`${baseURL}${$(link).attr("href")}`);
        urls.push(urlObj.href);
      } catch (e) {
        console.log(`error relative URL ${e}`);
      }
    } else {
      try {
        const urlObj = new URL(`${$(link).attr("href")}`);
        urls.push(urlObj.href);
      } catch (e) {
        console.log(`error relative URL ${e}`);
      }
    }
  });
  return urls;
};
