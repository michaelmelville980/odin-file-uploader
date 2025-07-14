const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("../db/client.js");

// Renders empty log-in form
async function renderLogIn(req, res) {
  res.render("log-in");
}

// Renders empty sign-up form
async function renderSignUp(req, res) {
  res.render("sign-up", { errors: [] });
}

// Handles Sign Up
async function handleSignUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("sign-up", {
      errors: errors.array(),
    });
  }
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const newUser = await db.createUser({
    username: req.body.username,
    passwordHash: passwordHash,
  });
  console.log(newUser);
  res.redirect("/");
}

// Handles Sign IN
async function renderFiles(req, res) {
  const items = await db.returnSelectedChildrenOrRoot();
  res.render("files", { items });
}

// Adds Folder
async function addFolder(req, res) {
  const folderName = req.body.folderName;
  await db.addFolder(folderName);

  renderFiles(req,res);
}

module.exports = {
  renderLogIn,
  renderSignUp,
  handleSignUp,
  renderFiles,
  addFolder
};
