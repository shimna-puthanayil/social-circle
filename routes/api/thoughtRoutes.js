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

//  /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .put(updateThought)
  .get(getSingleThought)
  .delete(deleteThought);

//   /api/thoughts/:thoughtId
// router.route("/:thoughtId/reactions/").post(createReaction);
//    /api/thoughts/:thoughtId/reactions
// router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
