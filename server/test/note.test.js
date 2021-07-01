const supertest = require("supertest");
const mongoose = require("mongoose");
const Note = require("../models/Note");
const { app, server } = require("../index");

const api = supertest(app);

const initialNotes = [
  {
    content: "learning NodeJS",
    type: "education",
    isChecked: false,
    isImportant: true,
  },
  {
    content: "practice piano",
    type: "personal",
    isChecked: false,
    isImportant: true,
  },
  {
    content: "study for exams",
    type: "education",
    isChecked: false,
    isImportant: false,
  },
];

// beforeEach(async () => {
//   await Note.deleteMany({});

//   const note1 = new Note(initialNotes[0])
//   await note1.save();

//   const note2 = new Note(initialNotes[1])
//   await note2.save();
// });

test("notes are being returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are five notes in the database", async () => {
  const response = await api.get("/api/notes");
  expect(response.body).toHaveLength(5);
});

test("the first note is about learning mongodb", async () => {
  const response = await api.get("/api/notes");
  expect(response.body[0].content).toBe("Learn MongoDB");
});

/*
test("a valid note can be added", async () => {
  const newNote = {
    content: "a new test note",
    type: "none",
    isChecked: false,
    isImportant: false,
  };

  api
    .post("/api/notes")
    .send(newNote)
    .expect(200)
    .expect("Content type", /application\/json/);

  const response = await api.post("/api/notes");
  const contents = response.body.map(note => note.content);

  expect(response.body).toHaveLength(resp);
  expect(contents).toContain(newNote.content);
});
*/

afterAll(() => {
  server.close();
  mongoose.connection.close();
});
