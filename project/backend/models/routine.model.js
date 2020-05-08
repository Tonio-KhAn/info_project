const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const routineSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    routineName: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Routine = mongoose.model("Routine", routineSchema);

module.exports = Routine;
