let arc = require("@architect/functions");
let data = require("@begin/data");

exports.handler = async function create(req) {
  let game = arc.http.helpers.bodyParser(req);
  game.created = Date.now();
  await data.set({
    table: "games",
    ...game,
  });
  return {
    statusCode: 302,
    headers: {
      location: "/",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
  };
};
