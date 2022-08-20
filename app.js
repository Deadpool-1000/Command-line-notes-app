const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

yargs.version("1.1.0");
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Title of the Note",
      required: true,
      type: "string",
    },
    body: {
      describe: "Body of the Note",
      required: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNotes(argv.title, argv.body);
  },
});
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Title of the Note",
      required: "true",
      type: "string",
    },
  },
  handler(argv) {
    const removedOrNot = notes.removeNotes(argv.title);
    if (removedOrNot > 0)
      console.log(chalk.green.inverse("Note removed successfully"));
    else console.log(chalk.red.inverse("No Note found!"));
  },
});
yargs.command({
  command: "list",
  describe: "Listing the notes",
  handler() {
    notes.listNotes();
  },
});
yargs.command({
  command: "read",
  describe: "Reading the notes",
  builder: {
    title: {
      describe: "Title of the Note",
      required: "true",
      type: "string",
    },
  },
  handler(argv) {
    notes.readNotes(argv.title);
  },
});
yargs.parse(); //or you can you choose console.log(yargs.argv)
