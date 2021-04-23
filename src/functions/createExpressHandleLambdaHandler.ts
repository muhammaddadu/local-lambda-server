import { Request, Response } from "express";

export function createExpressHandleLambdaHandler(handlerFn, name) {
  return async (request: Request, resp: Response) => {
    const event = {
      body: request.body,
      httpMethod: request.method,
      queryStringParameters: request.query,
      headers: request.headers,
    };
    const context = { functionName: name, awsRequestId: name };
    const action = await handlerFn(event, context);

    if (action.headers) {
      const cookiesToSet = action.headers["set-cookie"];
      const location = action.headers["location"];

      if (cookiesToSet && cookiesToSet.length) {
        cookiesToSet.forEach(({ value }) => {
          const [[key, val]] = value.split(";").map((item) => item.split("="));
          resp.cookie(key.trim(), val.trim(), {
            maxAge: 900000,
            httpOnly: true,
          });
        });
      }

      if (location?.length && location[0]?.value) {
        const redirectTo = location[0].value;
        console.log(`redirecting to ${redirectTo}`);
        resp.redirect(307, redirectTo);
      }
    }

    resp.status(action.statusCode);
    resp.send(action.body);
  };
}

export default createExpressHandleLambdaHandler;
