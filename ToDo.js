//A simple todo application with in mem data.

const express = require("express");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json());

// let autoGenNum = Math.random().toString(36).substring(2,6);

let myTodoArray = [
    {   
        id: Math.random().toString(36).substring(2,6),
        title: "First todo",
        description: "this is just the first to do in the description"
    },
    {
        id: Math.random().toString(36).substring(2,6),
        title: "2nd Todo",
        description: "This is the 2nd todo in the list"
    },
    {
        id: "here23",
        title: "2nd Todo",
        description: "This is the 2nd todo in the list"
    }


];

app.get("/todos", (req, res) => {
    res.status(200).json({
        myTodoArray
    })
})

app.get("/todos/:id", (req, res) => {

    let isID = myTodoArray.find((array) => array.id === req.params.id);

    if(isID){
        res.status(200).json({
            isID
        })
    }else{
        res.status(404).json({
            myTodoArray
        });
    }
})



app.listen(3000);