const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const {v4:uuidv4} = require("uuid");
const port = 8080;

// middleware 
app.set("view enigne", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

// tasks data 
let tasks = [
    {
        id:uuidv4(),
        task:"this is the first task to complete"
    },

    {
        id:uuidv4(),
        task:"this is the second task to complete"
    },

    {
        id:uuidv4(),
        task:"this is the third task to complete"
    }
]

// index route 
app.get("/tasks", (req, res)=>{
    res.render("index.ejs", {tasks});
    // res.send("index route working");
});

// create route 
app.get("/tasks/new", (req, res)=>{
    let id = uuidv4();
    res.render("new.ejs", {id});
});

app.post("/tasks", (req, res)=>{
    let newtask = req.body;
    tasks.push(newtask);
    res.redirect("/tasks");
});

// edit route 
app.get("/tasks/:id/edit", (req, res)=>{
    let {id} = req.params;
    console.log(id);
    let tasktoupdate = tasks.find((obj) => obj.id === id);
    console.log(tasktoupdate);
    // res.send("get request working");
    res.render("edit.ejs", {tasktoupdate});
})

app.patch("/tasks/:id", (req, res)=>{
    let {id, newtask} = req.body;
    console.log({newtask});
    let tasktoupdate = tasks.find((obj) => obj.id === id);
    console.log(tasktoupdate);
    tasktoupdate.task = newtask;
    res.redirect("/tasks");
    // let {id, task} = req.body;
    // res.send("update route working");
})

// destroy route 
app.delete("/tasks/:id/complete",(req, res)=>{
    let {id} = req.params;
    let tasktodelete = tasks.find((obj) => obj.id===id);
    console.log(tasktodelete);
    let idx = tasks.indexOf(tasktodelete);
    console.log(idx);
    tasks.splice(idx, 1);
    res.redirect("/tasks");
    // res.send("destroy route working");
})

// Server Run 
app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})