const mongoose = require("mongoose");

// read & write .env
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// replace password
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

// connect to database
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
