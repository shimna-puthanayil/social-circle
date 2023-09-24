const { Thought, reactionSchema, User } = require("../models");

module.exports = {
  //Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
      if (thought) {
        res.status(200).json(thought);
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  //Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      ).select("-__v");
      if (!thought) {
        return res.status(404).json({ message: "No Thought with that id" });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
        .select("-__v")
        .select("-reactions._id");
      if (!thoughts.length) {
        return res.status(404).json({ message: "No thoughts found" });
      }
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      }).select("-__v");
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      res.status(200).json({ message: "Successfully deleted the thought" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Create a reaction
  async createReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thoughts) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete a reaction
  async deleteReaction(req, res) {
    try {
      console.log(req.params.thoughtId);
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      ).select("-__v");
      if (!thoughts) {
        return res
          .status(404)
          .json({ message: "Thought not found with this id" });
      }
      res.status(200).json({ message: "Removed reaction" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
