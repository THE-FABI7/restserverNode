const { response } = require("express");
const User = require("../models/user");

const usersGet = (req, res = response) => {
  const query = req.query;

  res.json({
    msg: "users get request",
    query,
  });
};

const userPost = async (req, res = response) => {
  const body = req.body;
  const user = new User(body);
  await user.save();

  res.json({ msg: "user post request", user });
};

const usersPut = (req, res = response) => {
  const { id } = req.params;

  res.json({ msg: "users put request", id });
};
const usersPatch = (req, res = response) => {
  res.json({ msg: "users patch request" });
};
const usersDelete = (req, res = response) => {
  res.json({ msg: "users delete request" });
};

module.exports = {
  usersGet,
  userPost,
  usersPut,
  usersPatch,
  usersDelete,
};
