const { User, Thought } = require("../models");
module.exports = {
  //Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().select("-__v");
      if (!users) {
        res.status(404).json({ message: "No users found" });
      }
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Get a single User
  async getSingleUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.userId });
      if (!singleUser) {
        return req.status(404).json({ message: "User not found" });
      }
      res.status(200).json(singleUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};
