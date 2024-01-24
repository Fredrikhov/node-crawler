import { createWriteStream } from "fs";
import { crawl, removeProtocolFromUrl } from "./crawl";

const main = async (baseURL: string, currentURL: string) => {
  const craaawl = await crawl(baseURL, currentURL, []);
  // write output to a file
  const file = createWriteStream("result.txt");
  craaawl?.forEach((link) => file.write(`${removeProtocolFromUrl(link)}\n`));
  return "finished";
};

main("https://######.no", "https://######.no");
