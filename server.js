const express = require('express');
const path = require('path');
const fs = require("fs");
const notes = require("./db/db.json");
const uuid = require("uuid");
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({
  extended: true
}));

app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(express.json());

//routes for APIs 

//this command is responsible for saving notes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"))
});

//this one is to add new notes
app.use("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNotes = req.body;
  newNotes.id = uuid.v4();
  notes.push(newNotes);
  fs.writeFileSync("db/db.json", JSON.stringify(notes))
  res.json(notes);
});

//to be able to delete a note/s
app.delete("/api/notes/:id", (req, res) => {
  console.log(delNote);
  console.log("delete route hit!");
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
  fs.writeFileSync(".db/db.json", JSON.stringify(delNote));
  res.json(delNote);

})

//html call: home page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
//calling: notes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


//Start Listen
app.listen(PORT, function () { 
  //debug
  console.log(`App listening at http://localhost:${PORT}`)
});

//node server.js

