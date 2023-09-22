const { Thought } = require("../models");

//Create a thought
module.exports = {
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
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
      );
      if (!thought) {
        res.status(404).json({ message: "No Thought with that id" });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
