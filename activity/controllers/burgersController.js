var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burgers = require("../models/burgers.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burgers.all().then(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burger", function (req, res) {
  burgers.create(["name", "devoured"], [req.body.name, req.body.devoured]).then(function (result) {
    // Send back the ID of the new quote
    console.log('added')
    res.json({ id: result.insertId });
  });
});

router.put("/api/burger/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log(req.body.newDevourState)
  burgers.update(
    {
      devoured: req.body.devour
    },
    condition)
    .then(
      function (result) {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();

      }
    );
});

router.delete("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.delete(condition)
    .then(
      function (result) {
        if (result.affectedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();

      }
    );
});

// Export routes for server.js to use.
module.exports = router;
