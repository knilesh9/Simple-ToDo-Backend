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
        description: "this is just the first to do in the description",
        completed: false
    },
    {
        id: Math.random().toString(36).substring(2,6),
        title: "2nd Todo",
        description: "This is the 2nd todo in the list",
        completed: false
    },
    {
        id: "the3rd", //for debugging purposes
        title: "3rd Todo",
        description: "This is the 3rd todo in the list",
        completed: false
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

app.post("/todos", (req, res) => {

    //Object destructuring was necessary.
    let {title, description, completed} = req.body;
    let id = Math.random().toString(36).substring(2, 6);
    myTodoArray.push({id, title, description, completed});
    /*  else the code was long without destructuring 
        since id.title will only contain variable
        you would need to use title: id.title, this is long.(avoid)
    */

    //sending JSON arranges the items.
    res.status(201).json({
        myTodoArray
    });
})

app.put("/todos/:id", (req, res) => {

    let id = req.params.id

    let arrayIndex = myTodoArray.findIndex( array => array.id === req.params.id);

    // let id = Math.random().toString(36).substring(2, 6)
    let {title, description, completed} = req.body

     if(arrayIndex !== -1){

        let updatedData = myTodoArray.splice(arrayIndex, 1, {
            id, title, description, completed
        })

        res.status(200).json({
            updatedData
        })
    }else{
        res.status(404).send("ID NOT FOUND!")
    }
})

app.delete("/todos/:id", (req, res) => {
    let id = req.params.id;
    let getItem = myTodoArray.findIndex(array => array.id === id)
    if(getItem !== -1){
        myTodoArray.splice(getItem, 1)
        res.status(200).json({
            myTodoArray
        })
    }else{
        res.status(404).send("Check your ID")
    }
})


app.listen(3000);