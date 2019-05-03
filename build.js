/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-await-in-loop */

const fs = require("fs");

const chalk = require("chalk");
const ora = require("ora");
const shell = require("shelljs");

const styleSrcFolder = "./src/style";
const styleDistFolder = "./dist/style";

const execP = (cmd, msg, success) => {
  return new Promise((resolve, reject) => {
    const spinner = ora(msg).start();

    shell.exec(cmd, { silent: true }, (code, _, stderr) => {
      if (code !== 0) {
        spinner.fail(chalk.red(stderr));
        shell.echo(stderr);
        return reject();
      }

      spinner.succeed(success);
      return resolve();
    });
  });
};

const toCss = (inputPath, outputPath) =>
  execP(
    `yarn lessc ${inputPath} ${outputPath}`,
    `Building ${inputPath}`,
    chalk`Saved {blue ${inputPath}} to {blue ${outputPath}}`
  );

const toJS = () => {
  if (fs.existsSync("dist")) {
    shell.rm("-r", "dist");
  }

  return execP("yarn tsc", "Building Hiro UI");
};

(async () => {
  await toJS();

  if (!fs.existsSync(styleDistFolder)) {
    shell.mkdir("./dist/style");
  }

  const files = shell.ls("src/style/*.config");
  for (const filename of files) {
    const name = filename
      .split("/")
      .pop()
      .split(".config")
      .shift();
    const inputPath = `${styleSrcFolder}/${name}.less`;
    const outputPath = `${styleDistFolder}/${name}.css`;

    shell.sed("-i", ".less", ".css", "./dist/components/HiroTheme.js");

    await toCss(inputPath, outputPath);

    const assetPath = `dist/style/themes/${name}/assets`;

    shell.mkdir("-p", assetPath);

    shell.cp("-r", `src/style/themes/${name}/assets`, assetPath);
  }
})();
