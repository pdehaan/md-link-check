const fs = require("fs");
const path = require("path");
const url = require("url");

const markdownLinkExtractor = require("markdown-link-extractor");

const {checkEmails} = require("./check-emails");
const {checkFiles} = require("./check-files");
const {checkLinks} = require("./check-links");

exports.VALID_RES = {status: "alive", statusCode: 200};
exports.INVALID_RES = {status: "invalid", statusCode: 404};

exports.isEmailLike = (uri) => (/^mailto:$/i).test(protocol(uri));
exports.isFileLike = (uri) => protocol(uri) === null;
exports.isHttpLike = (uri) => (/^https?:$/i).test(protocol(uri));

exports.getLinks = async function getLinks(file) {
  const content = fs.readFileSync(file).toString();
  const links = markdownLinkExtractor(content);

  const data = {
    urls: links.filter(u => exports.isHttpLike(u)),
    emails: links.filter(e => exports.isEmailLike(e)),
    files: links.filter(f => exports.isFileLike(f))
  };

  const urls = await checkLinks(data.urls);
  const emails = checkEmails(data.emails);
  const files = checkFiles(data.files, path.dirname(file));

  // Merge results back into a single Object.
  return Object.assign({}, urls, emails, files);
}

function protocol(uri) {
  return url.parse(uri).protocol;
}
