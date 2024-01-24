import { test, expect } from "@jest/globals";
import { removeProtocolFromUrl, getUrlFromHTML, crawl } from "../crawl";

test("removeProtocolFromUrl - Remove URL Protocol", () => {
  const input = "https://hovweb.org/path";
  const result = removeProtocolFromUrl(input);
  const expected = "hovweb.org/path";
  expect(result).toEqual(expected);
});

test("removeProtocolFromUrl - Remove Trailing Slash", () => {
  const input = "https://hovweb.org/path/";
  const result = removeProtocolFromUrl(input);
  const expected = "hovweb.org/path";
  expect(result).toEqual(expected);
});

test("removeProtocolFromUrl - Convert URL To Lower Case ", () => {
  const input = "https://hoVweb.org/path/";
  const result = removeProtocolFromUrl(input);
  const expected = "hovweb.org/path";
  expect(result).toEqual(expected);
});

test("getUrlFromHTML - Get Absolute URL From HTML ", () => {
  const url = "https://hovweb.org/path/";
  const input = `<html>
                  <body>
                    <ul>
                      <li><a href="${url}"></a>
                      </li>
                    </ul>
                  <body>
                /html>`;
  const result = getUrlFromHTML(input, url);
  const expected = ["https://hovweb.org/path/"];
  expect(result).toEqual(expected);
});

test("getUrlFromHTML - Get Relative URL From HTML ", () => {
  const url = "https://hovweb.org";
  const input = `<html>
                  <body>
                    <ul>
                      <li><a href="/path/"></a>
                      </li>
                    </ul>
                  <body>
                /html>`;
  const result = getUrlFromHTML(input, url);
  const expected = ["https://hovweb.org/path/"];
  expect(result).toEqual(expected);
});

test("getUrlFromHTML - Get Multiple URLs Both Relative And Absolute ", () => {
  const url = "https://hovweb.org";
  const input = `<html>
                  <body>
                    <ul>
                      <li><a href="/path1/"></a></li>
                      <li><a href="${url}/"></a></li>
                      <li><a href="${url}/path2/"></a></li>
                    </ul>
                  <body>
                /html>`;
  const result = getUrlFromHTML(input, url);
  const expected = [
    "https://hovweb.org/path1/",
    "https://hovweb.org/",
    "https://hovweb.org/path2/",
  ];
  expect(result).toEqual(expected);
});

test("getUrlFromHTML - Get Multiple Links Remove ", () => {
  const url = "https://hovweb.org";
  const input = `<html>
                  <body>
                    <ul>
                      <li><a href=""></a></li>
                      <li><a href="${url}/"></a></li>
                      <li><a href="${url}/path2/"></a></li>
                    </ul>
                  <body>
                /html>`;
  const result = getUrlFromHTML(input, url);
  const expected = ["https://hovweb.org/", "https://hovweb.org/path2/"];
  expect(result).toEqual(expected);
});

test("getUrlFromHTML - Invalid url", () => {
  const url = "https://hovweb.org";
  const input = `<html>
                  <body>
                    <ul>
                      <li><a href="foobar"></a></li>
                    </ul>
                  <body>
                /html>`;
  const result = getUrlFromHTML(input, url);
  const expected: [] = [];
  expect(result).toEqual(expected);
});
