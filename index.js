import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const toDoItemsMain = [];
const toDoItemsWork = [];
const toDoItemsChores = [];
const completedItems = [];

app.get("/", (req,res)=> {

    res.render('index', {toDoItemsMain: toDoItemsMain});
});

app.get("/work", (req,res)=> {

    res.render('work', {toDoItemsWork: toDoItemsWork});
});

app.get("/chores", (req,res)=> {

    res.render('chores', {toDoItemsChores: toDoItemsChores});
});

app.post("/", (req,res)=> {
    toDoItemsMain.push(req.body.toDoItem)

    res.redirect('/');
});

app.get("/about", (req, res)=> {
    
    res.render('about');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });