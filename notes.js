const fs = require("fs");
const Chalk = require("Chalk");


const addNotes = (title, body) => {
  const notes = loadNotes();
  const foundNotes = notes.filter((el) => el.title == title || el.body == body);
  if (foundNotes.length == 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
  } else {
    console.log("Already added title please try agin!");
  }
};
const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("storeNotes.json", dataJson);
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("storeNotes.json");
    const jsonData = dataBuffer.toString();
    return JSON.parse(jsonData);
  } catch (e) {
    return [];
  }
};
const removeNotes = (title) => {
  const notes = loadNotes();
  const requiredNotes = notes.filter((note) => note.title != title);
  if (requiredNotes.length != notes.length) {
    saveNotes(requiredNotes);
    return 3; //A note is removed
  } else return -5;
};
const readNotes = (title) => {
  const notes = loadNotes();
  const foundNote = notes.find((note) => note.title == title);
  if (foundNote) {
    console.log(Chalk.green(foundNote.title));
    console.log(foundNote.body);
  } else {
    console.log(Chalk.red.inverse("No such Note Found!"));
  }
};
const listNotes = () => {
  const allNotes = loadNotes();
  if ( allNotes.length === 0 ) {
    console.log(Chalk.red.inverse("Currently, There are no Notes"));
    return;
  }
  console.log(Chalk.blue.inverse("Your Notes:  "));
  allNotes.forEach((note, i) => {
    console.log(Chalk.green(note.title));
    console.log(note.body);
    console.log("-----------------------------------------------------");
  });
};
module.exports = {
  addNotes: addNotes,
  listNotes: listNotes,
  readNotes: readNotes,
  removeNotes: removeNotes,
};
