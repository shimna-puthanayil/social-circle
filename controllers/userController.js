const { User, Thought } = require("../models");

module.exports = {
  //Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find()
        .populate({
          path: "thoughts",
          select: "-__v  -reactions._id",
        })
        .populate({ path: "friends", select: "-__v" })
        .select("-__v");
      if (!users.length) {
        return res.status(404).json({ message: "No users found" });
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
        .populate({ path: "thoughts", select: "-__v -reactions._id" })
        .populate({ path: "friends", select: "-__v" })
        .select("-__v");
      if (!singleUser) {
        console.log("not found");
        return res.status(404).json({ message: "User not found" });
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
      if (user) {
        res.json(user);
      }
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
        return res.status(404).json({ message: "User not found" });
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
        return res.status(404).json({ message: "No User found with this id" });
      }
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res
        .status(200)
        .json({ message: "User and associated thoughts are deleted" });
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
        return res.status(404).json({ message: "No user found with this id" });
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
        return res.status(404).json({ message: "No User found with this id" });
      }
      res.status(200).json({ message: "Successfully removed friend" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
