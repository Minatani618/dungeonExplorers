var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  let data = { title: "standard dungeon" };
  res.render("dungeon", data);
});

module.exports = router;
