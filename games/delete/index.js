let data = require("@begin/data");

exports.handler = async function destroy(req) {
  const { id } = req.pathParameters;
  console.log(id);
  await data.destroy({
    key: id,
    table: "games",
  });

  return {
    statusCode: 204,
  };
};
