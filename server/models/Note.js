const { Schema, model } = require("mongoose");

//   Create a mongo schema
const noteSchema = new Schema({
  content: String,
  type: String,
  isChecked: Boolean,
  isImportant: Boolean,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

// Specify the way mongoose uses certains methods (Eg: toJSON)
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id; // Creates a new prop id
    delete returnedObject._id; // Delete the props we dont need
    delete returnedObject.__v; // Delete the props we dont need
  },
});

// Create a model
const Note = model("Note", noteSchema); // El primer campo es el nombre de la coleccion (que luego Mongo le hara un lowercase y le agrega una 's'); y el segundo parametro es el esquema de la coleccion

module.exports = Note;
