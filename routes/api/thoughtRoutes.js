const router = require("express").Router();
const {
  createThought,
  updateThought,
  deleteThought,
  getThoughts,
  getSingleUser,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").post(createThought);

//  /api/thought/:thoughtId
router.route("/:thoughtId").put(updateThought);
module.exports = router;
