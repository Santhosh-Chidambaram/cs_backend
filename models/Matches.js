const mongoose = require("mongoose");

const PlayerSchema = mongoose.Schema({
  playerName: {
    type: String,
  },
  playerScore: {
    type: Number,
  },
  wickets: {
    type: Number,
  },
  overs: {
    type: Number,
  },
});

const TeamSchema = mongoose.Schema({
  teamName:String,
  score: Number,
  players: [PlayerSchema],
});

const MatchSchema = mongoose.Schema({
  isLive: {
    type: Boolean,
  },
  matchDate: {
    type: String,
  },
  team1: TeamSchema,
  team2: TeamSchema,
});

module.exports = mongoose.model("matches", MatchSchema);
