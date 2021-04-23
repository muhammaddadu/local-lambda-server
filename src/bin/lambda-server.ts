#!/usr/bin/env node

import args from "args";
import { promisify } from "util";
import { existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { LocalLambdaServer } from "..";

const demoLambdaDefinition = [
  { url: "/v1/hello", lambdaFilePath: "./hello", handlerFn: "handler" },
];

args
  .option("port", "The port on which the server will be running", 3001)
  .option(
    "definitionFile",
    `JSON file contaning lambda definitions\n e.g. labda-definition.json ${JSON.stringify(
      demoLambdaDefinition,
      null,
      "\t"
    )}`
  );

function run() {
  const { port, definitionFile } = args.parse(process.argv);

  if (!definitionFile) {
    return console.error(
      "Please define definition file.\n Use --help for more info"
    );
  }

  if (!existsSync(definitionFile)) {
    return console.error(
      `Could not find file "${resolve(
        definitionFile
      )}".\n Use --help for more info`
    );
  }

  const server = new LocalLambdaServer();
  const lambdaDefinitions = require(resolve(definitionFile));

  lambdaDefinitions.forEach(({ url, lambdaFilePath, handlerFn }) => {
    const actualLambdaFilePath = join(
      resolve(dirname(definitionFile), lambdaFilePath)
    );
    server.attachLambda(
      url,
      promisify(require(actualLambdaFilePath)[handlerFn])
    );
  });

  server.listen(port);
}

run();
