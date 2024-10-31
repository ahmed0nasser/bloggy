const { model } = require("mongoose");
const counterSchema = require("../schemas/counterSchema");

const Counter = model("Counter", counterSchema);

// Initialize id counters if not exist
setImmediate(async () => {
  if (!(await Counter.findById("user"))) await Counter.create({ _id: "user" });
  if (!(await Counter.findById("blog"))) await Counter.create({ _id: "blog" });
});

module.exports = Counter;
