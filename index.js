const glob = require("glob");

const {VALID_RES, getLinks} = require("./lib");

const argv = process.argv.slice(2);

argv.forEach(async p => {
  try {
    for (const file of glob.sync(p)) {
      console.log(`\nChecking ${file}`);
      const links = await getLinks(file);

      Object.entries(links).forEach(([url, {status, statusCode}]) => {
        if (status !== VALID_RES.status) {
          console.error(`  - [${statusCode || status}] ${url}`);
          process.exitCode = 2;
        }
      });
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
