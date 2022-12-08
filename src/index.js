const app = require("./app");
require("./database");
// import "./database";

// app.listen(3000);
// console.log("Server on port 3000");

async function init() {
  await app.listen(3000);
  console.log("Server on port 3000");
}

init();
