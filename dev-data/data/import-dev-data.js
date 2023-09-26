const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const port = 3001; // Choose any port number you prefer
const Tour = require("./../../models/moviemodel");

const url =
  "mongodb+srv://admin:5dEKCbad9uvARLN5@cluster0.xsiblnd.mongodb.net/cineflix?retryWrites=true&w=majority";

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

//READ JSON FILE
const tours = fs.readFileSync("tours-simple.json", "utf-8");

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    process.exit();
    console.log("Data created successfully");
  } catch (err) {
    console.log(err);
  }
};

//DELETE PREVIOUS DATA
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    process.exit();
    console.log("deleted data successfully");
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
