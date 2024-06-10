// Task1: initiate app and run server at 3000
const express = require("express");
const app = new express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
app.use(morgan('dev'));
require ('dotenv').config();

const employeeData =require("./model/employeeList");

app.use(express.static(path.join(__dirname + "/dist/Frontend")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));




// Task2: create mongoDB connection 
mongoose.connect("mongodb+srv://fathimadileep2019:IvkgCLujY8SOJDF6@cluster0.pntoruz.mongodb.net/employeeDB?retryWrites=true&w=majority",{useNewUrlParser:true}).then(()=>{
    console.log('DB is connected');
})
.catch(()=>{
    console.log('Error in connection');
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employeelist",async(req,res)=>{
    const data = await employeeData.find()
    .then((docs)=>{
        res.json(docs);
    })
    .catch((err)=>{
        res.send(err);
    });
})


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get("/api/employeelist/:id",async(req,res)=>{
    const data = await employeeData.findById(req.params.id)
    .then((doc)=>{
        res.json(doc);
    })
    .catch((err)=>{
        res.send(err);
    });
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist",async(req,res)=>{
    const data = new employeeData(req.body);
    data.save().then((doc)=>{
        res.json(doc);
    })
    .catch((err)=>{
        res.send(err);
    });
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete("/api/employeelist/:id",async(req,res)=>{
    const data = await employeeData.findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.json({status:"ok",result:result});
    })
    .catch((err)=>{
        res.send(err);
    });
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put("/api/employeelist",async(req,res)=>{
    const data = await employeeData.findOneAndUpdate({"_id":req.body._id},req.body)
    .then((doc)=>{
        res.json({status: "ok",result: req.body});
    })
    .catch((err)=>{
        res.send(err);
    });
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



//Server listening on http://localhost:3000/api


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})
