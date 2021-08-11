let arc = require("@architect/functions");
let data = require("@begin/data");

exports.handler = async function update(req) {
  let player = arc.http.helpers.bodyParser(req);
  player.completed = !!player.completed;
  await data.set({
    table: "players",
    ...player,
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
