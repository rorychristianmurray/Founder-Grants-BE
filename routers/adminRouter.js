const router = require("express").Router();
const jwt = require("jsonwebtoken");

const admin = require("../models/adminModel.js");

// ==========GET: retrieve all grants==========
router.get("/", (req, res) => {
  admin
    .getGrants()
    .then(grant => {
      res.json(grant);
    })
    .catch(err => res.status(500).json({ message: "bummer", err }));
});

// ==========PUT: update a grant==========
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  admin
    .updateGrant(changes, id)
    .then(grant => {
      if (grant) {
        res.status(200).json(grant);
      } else {
        res
          .status(404)
          .json({ message: "The grant with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error modifying the grant." });
    });
});

// ==========DELETE: remove a grant==========
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  admin
    .removeGrant(id)
    .then(grant => {
      if (grant) {
        res.status(200).json(grant);
      } else {
        res
          .status(404)
          .json({ message: "The grant with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error removing the grant." });
    });
});

// ==========DELETE: remove a suggestion for a grant==========
router.delete("/suggestion/:id", (req, res) => {
  const { id } = req.params;
  admin
    .removeSuggestion(id)
    .then(suggestion => {
      if (suggestion) {
        res.status(200).json(suggestion);
      } else {
        res.status(404).json({
          message: "The suggestion with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error removing the grant." });
    });
});

module.exports = router;