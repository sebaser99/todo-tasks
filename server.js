const express = require("express");
const cors = require('cors');
const api = require('./api');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || "4200"

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Bienvenido a la api de tareas")
})

app.listen(port, ()=>{
    console.log(`Server is listening in port ${port}`)
})
app.use('/api', api);