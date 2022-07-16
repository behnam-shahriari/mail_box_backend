const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const emails = require("./controllers/emails");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "Behnam?70",
    database: "mail_box",
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt, saltRounds)
);
app.get("/totalEmails/:id", (req, res) =>
  emails.handleTotalEmailsGet(req, res, db)
);

app.get("/messages/:id", (req, res) => emails.handleMessage(req, res, db));
// app.get("/profile/:id", (req, res) => emails.handleEmailsGet(req, res, db));

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
