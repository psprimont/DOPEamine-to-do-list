import express from "express";
import { getDate } from './date.js';

const app = express();
const port = process.env.port || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const toDoItemsMain = [];
const toDoItemsWork = [];
const toDoItemsChores = [];
const checkStatusMain = [];
const checkStatusWork = [];
const checkStatusChores = [];
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

//add new to-do items to corresponding array; add default unchecked status to corresponding array
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

//
app.post("/check", (req, res) => {

    if (req.body.toDoList === "list-work") {
        let index = Number(req.body.toDoIndex);
        if (checkStatusWork[index] === "unchecked") {
            checkStatusWork[index] = "checked";
        } else {
            checkStatusWork[index] = "unchecked";
        }
        res.redirect("/work");
      } else if (req.body.toDoList === "list-chores") {
        let index = Number(req.body.toDoIndex);
        if (checkStatusChores[index] === "unchecked") {
            checkStatusChores[index] = "checked";
        } else {
            checkStatusChores[index] = "unchecked";
        }
        res.redirect("/chores");
      } else {
        let index = Number(req.body.toDoIndex);
        if (checkStatusMain[index] === "unchecked") {
            checkStatusMain[index] = "checked";
        } else {
            checkStatusMain[index] = "unchecked";
        }
        res.redirect("/");
      }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


