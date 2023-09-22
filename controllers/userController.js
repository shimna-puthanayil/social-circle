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
  //Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json("User not found");
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        res.status(404).json("No User with that id");
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.status(200).json({ message: "User and thoughts deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
