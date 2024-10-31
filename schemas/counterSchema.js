const { Schema, model } = require("mongoose");

module.exports = new Schema(
  {
    _id: String,
    sequenceValue: { type: Number, default: 0 },
  },
  {
    methods: {
      async getNextSequenceValue() {
        this.sequenceValue++;
        await this.save();
        return this.sequenceValue;
      },
    },
  }
);
