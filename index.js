import express from "express";
import { getDate } from './date.js';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const toDoItemsMain = ["main1", "main2", "main3"];
const toDoItemsWork = ["work1", "work2", "work3"];
const toDoItemsChores = ["chores1", "chores2", "chores3"];
const checkStatusMain = ["unchecked", "unchecked", "checked"];
const checkStatusWork = ["unchecked", "checked", "checked"];
const checkStatusChores = ["checked", "unchecked", "unchecked"];
const todaysDate = getDate();

app.get("/", (req, res) => {
  res.render("index", { toDoItems: toDoItemsMain, checkStatus: checkStatusMain, date: todaysDate, listTitle: "list-main" });
  
});

app.get("/work", (req, res) => {
  res.render("index", { toDoItems: toDoItemsWork, checkStatus: checkStatusWork, date: todaysDate, listTitle: "list-work" });
});

app.get("/chores", (req, res) => {
  res.render("index", { toDoItems: toDoItemsChores, checkStatus: checkStatusChores, date: todaysDate, listTitle: "list-chores" });
});

app.post("/", (req, res) => {
  if (req.body.list === "list-work") {
    toDoItemsWork.push(req.body.toDoItem);
    checkStatusWork.push("unchecked");
    res.redirect("/work");
  } else if (req.body.list === "list-chores") {
    toDoItemsChores.push(req.body.toDoItem);
    checkStatusChores.push("unchecked");
    res.redirect("/chores");
  } else {
    toDoItemsMain.push(req.body.toDoItem);
    checkStatusMain.push("unchecked");
    res.redirect("/");
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
