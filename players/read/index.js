const data = require("@begin/data");

exports.handler = async function read(req) {
  let pages = await data.get({
    table: "players",
    limit: 25,
  });

  let players = [];
  for await (let player of pages) {
    players.push(player);
  }

  players.sort((a, b) => a.name - b.name);

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    body: JSON.stringify(players),
  };
};
