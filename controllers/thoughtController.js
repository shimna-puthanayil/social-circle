const { Thought } = require("../models");

//Create a thought
module.exports = {
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body).select("-__v");
      if (thought) {
        res.status(200).json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
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
        res.status(404).json({ message: "No Thought with that id" });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().select("-__v");
      if (!thoughts) {
        res.status(404).json({ message: "No thoughts found" });
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
        res.status(404).json({ message: "No thought found with this id" });
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
        res.status(404).json("No thought found with that id");
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
