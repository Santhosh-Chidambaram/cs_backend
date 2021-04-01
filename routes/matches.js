const { ObjectId } = require("bson");
const express = require("express");
const router = express.Router();
const { check, checkBody, validationResult } = require("express-validator");

const auth = require("../middlewares/auth");
const Matches = require("../models/Matches");

// @routes    GET /api/matches
// @des get all matches
//access private

router.get("/",auth, async (req, res) => {
  try {
    const matches_list = await Matches.find().sort({ matchDate: -1 });
    res.json(matches_list);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// @routes  POST /api/matches
// @des add matche
//access private

router.post("/",auth,async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { isLive, matchDate, team1, team2 } = req.body;

  try {
    const newMatch = new Matches({ isLive, matchDate, team1, team2 });
    const newMatch_lst = await newMatch.save();
    res.json(newMatch_lst);
  } catch (err) {
    console.error(err.message);
    res.status(501).json({ msg: "serverr error" });
  }
});

// @routes  POST /api/matches/players
// @des add players to team
//access private

router.post("/players/:team_id",auth, async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  const teamId = req.params.team_id;
  const { playerName, playerScore, wickets, overs } = req.body;
  console.log(teamId);
  try {
    let playerForm = {
      playerName,
      playerScore,
      wickets,
      overs,
    };

    const team1 = await Matches.update(
      { "team1._id": ObjectId(teamId) },
      {
        $addToSet: {
          "team1.players": playerForm,
        },
      }
    );
    const team2 = await Matches.update(
      { "team2._id": ObjectId(teamId) },
      {
        $addToSet: {
          "team2.players": playerForm,
        },
      }
    );

    if (team1) {
      return res.json(team1);
    } else if (team2) {
      return res.json(team2);
    } else {
      return res.json({});
    }
  } catch (err) {
    console.error(err.message);
    res.status(501).json({ msg: "serverr error" });
  }
});

// @routes  POST /api/matches/players
// @des update players to team
//access private

router.put("/players/:team_id",auth, async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  const teamId = req.params.team_id;
  const { playerName, playerScore, wickets, overs, _id } = req.body;
  console.log(teamId);
  try {
    let playerForm = {
      _id,
      playerName,
      playerScore,
      wickets,
      overs,
    };

    const team1 = await Matches.find({ "team1._id": ObjectId(teamId) });
    const team2 = await Matches.find({ "team2._id": ObjectId(teamId) });

    if (team1) {
      return res.json(team1);
    } else if (team2) {
      return res.json(team2);
    } else {
      return res.json({});
    }
  } catch (err) {
    console.error(err.message);
    res.status(501).json({ msg: "serverr error" });
  }
});

// @routes  PUT /api/matches
// @des update natches
//access public

router.put("/:id",auth, async (req, res) => {
  const { _id, isLive, matchDate } = req.body;
  let matchFields = {};
  if (isLive) matchFields.isLive = isLive;
  if (matchDate) matchFields.matchDate = matchDate;
  console.log(req.params.id);

  try {
    console.log(_id);

    let matchForm = await Matches.findByIdAndUpdate(
      req.params.id,
      { $set: matchFields },
      { new: true }
    );

    res.json(matchForm);
  } catch (er) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

// @routes  DELETE /api/matches/player/id
// @des delete matches
//access private

router.delete("/player",auth,async (req, res) => {
  const { playerId, teamId } = req.body;
  try {
    let team1 = await Matches.find({
      "team1._id": ObjectId(teamId),
    });
    let team2 = await Matches.find({
      "team2._id": ObjectId(teamId),
    });
    if (!team1 && team2)
      return res.status(401).json({ msg: "Match not found" });

    if (team1) {
      await Matches.update(
        {
          "team1._id": ObjectId(teamId),
        },
        {
          $pull: { "team1.players": { _id: ObjectId(playerId) } },
        }
      );
    } else {
      await Matches.update(
        {
          "team2._id": ObjectId(teamId),
        },
        {
          $pull: { "team2.players": { _id: ObjectId(playerId) } },
        }
      );
    }
    res.json({ msg: "Player deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @routes  DELETE /api/matches/id
// @des delete matches
//access private

router.delete("/:id",auth, async (req, res) => {
  try {
    let matchForm = await Matches.findById(req.params.id);
    if (!matchForm) return res.status(401).json({ msg: "Match not found" });
    await Matches.findByIdAndRemove(req.params.id);
    res.json({ msg: "Match deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
