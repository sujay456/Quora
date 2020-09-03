const express = require("express");
const router = express.Router();
const postController = require("../../../controller/api/v1/post_api");
const passport = require("passport");
const userController = require("../../../controller/api/v1/users");
router.get("/", postController.index);

router.post("/create-session", userController.session);
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  postController.deleteQuestionsViaApi
);

module.exports = router;
