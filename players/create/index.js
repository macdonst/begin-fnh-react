let arc = require("@architect/functions");
let data = require("@begin/data");

exports.handler = async function create(req) {
  let player = arc.http.helpers.bodyParser(req);
  player.created = Date.now();
  await data.set({
    table: "players",
    ...player,
  });
  return {
    statusCode: 201,
  };
};
