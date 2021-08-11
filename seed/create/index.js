// let arc = require("@architect/functions");
let data = require("@begin/data");

let players = require("./players");
let games = require("./games");

exports.handler = async function create(req) {
  games = games.map((game) => {
    return { players, ...game };
  });
  await data.set(games);
  await data.set(players);
  return {
    statusCode: 200,
  };
};
