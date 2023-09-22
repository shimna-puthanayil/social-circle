const { User, Thought } = require("../models");

module.exports = {
  //Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .populate({ path: "friends", select: "-__v" });

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
      const singleUser = await User.findOne({
        _id: req.params.userId,
      })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" });
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
      const user = await User.create(req.body).select("-__v");
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
      ).select("-__v");
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
      const user = await User.findOneAndDelete({
        _id: req.params.userId,
      }).select("-__v");
      if (!user) {
        res.status(404).json("No User with that id");
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.status(200).json({ message: "User and thoughts deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Add a friend to a user
  async createFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      ).select("-__v");
      if (!friend) {
        res.status(404).json({ message: "No user found with this id" });
      }
      res.status(200).json(friend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //Remove a friend of user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      ).select("-__v");
      if (!user) {
        res.status(404).json({ message: "No User found with this id" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
