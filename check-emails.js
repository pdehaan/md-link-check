const isemail = require("isemail");

const {VALID_RES, INVALID_RES} = require("./lib");

function checkEmails(emails) {
  return emails.reduce((res, address) => {
    const email = address.replace("mailto:", "");
    res[address] = isemail.validate(email) ? VALID_RES : INVALID_RES;
    return res;
  }, []);
}

exports.checkEmails = checkEmails;
