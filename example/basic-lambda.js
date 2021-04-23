module.exports.handler = function handler(event, context, cb) {
  return cb(null, {
    statusCode: 200,
    statusDescription: "OK",
    headers: {
      "Content-Type": "application/json",
    },
    body: "Hello World",
  });
};
