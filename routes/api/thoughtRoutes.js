const router = require("express").Router();
const {
  createThought,
  updateThought,
  deleteThought,
  getThoughts,
  getSingleThought,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").post(createThought).get(getThoughts);

//  /api/thought/:thoughtId
router.route("/:thoughtId").put(updateThought).get(getSingleThought);
module.exports = router;
