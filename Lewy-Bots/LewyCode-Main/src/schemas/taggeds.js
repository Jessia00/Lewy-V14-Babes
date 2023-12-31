const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  taggeds: { type: Array, default: [] },
  oldTagged: { type: Array, default: [] }
});

module.exports = model("taggeds", schema);
