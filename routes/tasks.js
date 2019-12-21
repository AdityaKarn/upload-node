var express = require("express");
var router = express.Router();
const json = require("../public/data/taskData.json");

/* GET home page. */
router.get("/:num", function(req, res, next) {
  let taskNum = Number(req.params.num);
  if (Number.isInteger(taskNum) && taskNum >= 1 && taskNum <= 10) {
    res.render("task_page", json[taskNum - 1]);
  } else {
    res.render("not_found");
  }
});

module.exports = router;
