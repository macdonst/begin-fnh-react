const data = require("@begin/data");

exports.handler = async function read(req) {
  let pages = await data.get({
    table: "games",
    limit: 25,
  });

  let games = [];
  for await (let game of pages) {
    games.push(game);
  }

  games.sort((a, b) => a.created - b.created);

  return {
    statusCode: 201,
    headers: {
      "content-type": "application/json; charset=utf8",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
    body: JSON.stringify(games),
  };
};
