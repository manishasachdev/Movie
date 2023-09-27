const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors"); 
const app = require("./app");
const port = 3001; // Choose any port number you prefer

const url =
  "mongodb+srv://admin:5dEKCbad9uvARLN5@cluster0.xsiblnd.mongodb.net/cineflix?retryWrites=true&w=majority";

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
  
//connection with DataBase
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Err", err);
  });

// // Define a route to handle incoming requests
// app.get("/", (req, res) => {
//   res.send("Hello, this is your server  !");
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
