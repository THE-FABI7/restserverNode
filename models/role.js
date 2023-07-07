const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: "string",
    required: [true, "required"],
  },
});

module.exports = model("Role", RoleSchema);
