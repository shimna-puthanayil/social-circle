const { User, Thought } = require("../models");
module.exports = {
  //Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  //Get a single User
  async getSingleUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.body.userId });
    } catch {}
  },
};
