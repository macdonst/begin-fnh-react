let arc = require("@architect/functions");
let data = require("@begin/data");

exports.handler = async function create(req) {
  let game = arc.http.helpers.bodyParser(req);
  game.created = Date.now();
  await data.set({
    table: "games",
    day: "Friday",
    ...game,
  });
  return {
    statusCode: 201,
  };
};
