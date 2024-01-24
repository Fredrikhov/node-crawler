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
    if ($(link).attr("href")?.startsWith("/") && !baseURL.endsWith("/")) {
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

export const crawl = async (
  baseURL: string,
  currentURL: string,
  pages: string[]
) => {
  const seen: string[] = [];
  if (seen.indexOf(currentURL) > -1) {
    console.log(`Link already seen ${currentURL}`);
    return;
  } else {
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);

    if (baseURLObj.hostname !== currentURLObj.hostname) {
      console.log(`will not crawl ${currentURL}`);
      return pages;
    }
    console.log(`Crawling actively: ${currentURL}`);
    try {
      const response = await fetch(currentURL);
      const htmlbody = await response.text();
      pages = await getUrlFromHTML(htmlbody, currentURL);
      pages.forEach((link) => {
        seen.push(link);
        crawl(baseURL, link, pages);
      });
    } catch (error) {
      console.log(`Err: ${error}`);
    }
  }
  return pages;
};
