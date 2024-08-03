const express = require("express");
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || "4200"

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Bienvenido a la api de tareas")
})

app.listen(port, ()=>{
    console.log(`Server is listening in port ${port}`)
})