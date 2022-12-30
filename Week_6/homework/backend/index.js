/** Todo App */
const firebase = require("./firebase/cred.js");
const express = require("express");
const app = express()
const cors = require('cors')
const db = firebase.firestore();
require("dotenv").config();


// Application level middleware
app.use(express.json())
app.use(cors())


// Define Routes
app.use("/todo", require("./routes/todo.js"));

app.listen(process.env["PORT"], () =>
  console.log("App listening on port " + process.env["PORT"])
);

