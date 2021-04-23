# local-labda-server
> node package that allows you to run AWS HTTP Node Lambda's locally emulating the ALB

## Development

#### Install dependencies
```bash
npm install
```

#### Create build
```bash
npm run build
```

#### Run CLI in dev mode with auto-reload
```bash
ts-node-dev ./src/bin/lambda-server.ts
```

#### Run example lambda with CLI
```bash
ts-node-dev ./src/bin/lambda-server.ts --definitionFile=./example/local-lambda-definition.json 
curl localhost:3001/hello
```

## CLI Usage

```bash
Usage: npx local-lambda-server [options]

Commands:
  help     Display help
  version  Display version

Options:
  -d, --definitionFile  JSON file contaning lambda definitions
  e.g. labda-definition.json [
      {
              "url": "/v1/hello",
              "lambdaFilePath": "./hello",
              "handlerFn": "handler"
      }
    ]
  -h, --help            Output usage information
  -p, --port <n>        The port on which the server will be running (defaults to 3001)
  -v, --version         Output the version number
```
