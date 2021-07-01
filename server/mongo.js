const mongoose = require("mongoose");

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env;

// Connection to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch(err => console.error(err));

// Disconnect from DB when error
process.on("uncaughtException", err => {
  console.log(err);
  mongoose.connection.disconnect();
});

// Note.find({})
//   .then(res => {
//     console.log(res), mongoose.connection.close();
//   })
//   .catch(err => console.log(err));

// // Create a note
// const note = new Note({
//   content: "Learn MonogoDB",
//   type: "personal",
//   isChecked: false,
//   isImportant: true,
// });

// note
//   .save()
//   .then(res => {
//     console.log(res);
//     mongoose.connection.close();
//   })
//   .catch(err => {
//     console.log(err);
//   });
