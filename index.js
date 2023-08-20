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




// CURRENT BUGS/PROJECTS 

// 1. checked off items delete on new form submission or page reload
// Potential solutions:
//     a. sessionStorage or localStorage  
//     b. XMLHttpRequest 
//     c. make each checkbox a form 
//     d. use plain JS to change checked attribute (not sure if this persists through page relaods)





// Ideas:
// 1. a primary to-do list that includes everything from each category?
// 2. dropdown menu by the to-do adding form that allows you to select which list the to-do item goes to?
// 3. move items down to the bottom of the list when they get crossed out? <- maybe use app.put or app.patch for this
// 4. once you cross off all items for the day, you get to "roll the dice" or "spin the wheel" for a chance at getting an indulgence token
// 5. "Reset" button to clearall items and start a new day
// 6. ability to delete items
// 7. dynamic, stylized clock that reads out the current time. (is there an API for this?)


// MAYBE EVENTUALLY
// 1. ability to create a daily (time-stamped) schedule
// 2. reminders
// 3. timer function 
// 4. ability to have daily tasks that autoload to your to-do list << will require use of database



// QUOTES/CONTENT

// This to-do list works with you, not for you. As the saying goes, you get out what you put in. So, be honest with yourself, be kind to yourself, and when you've done what you set out to do, don't be afraid to occasionally treat yo' self.

// It's worth noting that the intention of the Treat Yo'Self Token is to enhance your motivation and focus both in the moment and big-picture, not to snuff out your motivation or diminish your focus. So while some of the features (random chance, cookie crumbs) and mechanisms (reward pathways and dopamine) may be shared with, say, a slot machine, I prefer to think of it in an evolutionary sense (albeit very simplified). The fruits of your labor are satisfyingly sweet because they nourish you. Put another way, it is my hope that you distinguish between a Treat Yo'Self Treat that enriches your life while considering the inevitability of consequences rather than a blowout night of drinking that leaves you bedridden 12 hours the next day. 

