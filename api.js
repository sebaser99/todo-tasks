const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const TaskModel = require('./task_schema');

let environment = null;

if (!process.env.ON_HEROKU) {
    console.log("Cargando variables de entorno desde archivo");
    const env = require('node-env-file');
    env(__dirname + '/.env');
}

environment = { 
    DBMONGOUSER: process.env.DBMONGOUSER,
    DBMONGOPASS: process.env.DBMONGOPASS,
    DBMONGOSERV: process.env.DBMONGOSERV,
    DBMONGO: process.env.DBMONGO,
};
console.log(environment)

// const query = `mongodb+srv://${environment.DBMONGOUSER}:${environment.DBMONGOPASS}@${environment.DBMONGOSERV}/${environment.DBMONGO}?authSource=admin&replicaSet=atlas-13vgq8-shard-0&readPreference=primary&ssl=true`
const query = `mongodb+srv://${environment.DBMONGOUSER}:${environment.DBMONGOPASS}@${environment.DBMONGOSERV}/${environment.DBMONGO}?retryWrites=true&w=majority`
// const query2 = "mongodb+srv://sebaser99:Alexs59208Ard741.12@parquesoft.va4wu0k.mongodb.net/admin?retryWrites=true&w=majority&appName=parquesoft"

console.log(query)

const db = query;

mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error! " + error);
    } else {
        console.log("Se ha conectado con la base de datos exitosamente");
    }
});

router.post('/create-task', (req, res)=> {
  
    let task = {
        TaskId: req.body.TaskId,
        Name: req.body.Name,
        Deadline: req.body.Deadline
    }
    
    const newTask = new TaskModel(task);

    newTask.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal error\n");
        }
        else {
            res.status(200).send("OK\n");
        }
    });
})

router.get('/all-tasks', (req, res)=> {
  
    TaskModel.find(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal error\n");
        }
        else {
            res.status(200).json({data:data});
        }
    });
})

router.get('/task/:id', (req, res)=> {
    const id = req.params.id
    TaskModel.findById(id, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal error\n");
        }
        else {
            res.status(200).json({data:data});
        }
    });
})

router.post('/task-update/:id', (req, res)=> {
    const id = req.params.id
    TaskModel.updateOne({ TaskId: req.params.id }, {
        Name: req.body.Name,
        Deadline: req.body.Deadline
    }, function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Internal error\n");
        }
        else {
            res.status(200).json({data:data});
        }
    });
})

router.delete('/delete-task/:id', function (req, res) {
    TaskModel.deleteOne({ TaskId: req.params.id}, function (err, data) {
        if (err) {
            res.status(500).send("Internal error\n");
        } else {
            res.status(200).send("OK\n");
        }
    });
});

module.exports = router;