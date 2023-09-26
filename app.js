// //My Practice:::::::::;;;

// const express = require("express");
// const fs = require("fs");

// const app = express();

// /*for post request , whatever client will send in request ,
// to read that we need to use middle ware ,
// in tis way we use middle ware */
// app.use(express.json());

// // app.get('/', (req, res) => {
// //   res.status(200).json({ message: 'hello Manisha from the server' });
// // });

// // app.post('/', (req, res) => {
// //   res.send('You can send data to this point...');
// // });

// //to read internal file of tours and send it in grt request
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );
// //::::::::::::::::::GET REQUEST TO GET ALL TOURS::::::::::::::::::::::::
// app.get("/api/v1/tours", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     results: tours.length,
//     data: {
//       tours: tours,
//     },
//   });
// });

// //::::::::::::::::::GET REQUEST SPECIFIC DATA BASED ON ID::::::::::::::::::::::::
// app.get("/api/v1/tours/:id", (req, res) => {
//   console.log(req.params); //is what ever we send in params/ query
//   const id = req.params.id * 1;
//   const tour = tours.find((ele) => ele.id === id);
//   // if (id > tours.length)
//   if (!tour) {
//     res.status(404).json({
//       status: "fail",
//       message: "Invalid id",
//     });
//   }
//   res.status(200).json({
//     status: "success",
//     data: {
//       tour: tour,
//     },
//   });
// });

// //::::::::::::::::::POST REQUEST / TO ADD NEW TOUR IN EXISTING TOURS LIST::::::::::::::::::::::::
// app.post("/api/v1/tours", (req, res) => {
//   console.log(req.body); // whatever we send in body /header
//   const newId = tours[tours.length - 1].id;
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: "success",
//         data: {
//           newTour,
//         },
//       });
//     }
//   );
// });

// //::::::::::::::::::PATCH REQUEST / TO UPDATE ANY SPECIFIC VALUE IN EXISTING TOURS LIST::::::::::::::::

// app.patch("/api/v1/tours/:id", (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     res.status(404).json({
//       status: "fail",
//       message: "Invalid id",
//     });
//   }
//   res.status(200).json({
//     status: "succcess",
//     data: "<Updated patch req>",
//   });
// });

// //::::::::::::::::::DELETE REQUEST::::::::::::::::

// app.delete("/api/v1/tours/:id", (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     res.status(404).json({
//       status: "fail",
//       message: "Invalid id",
//     });
//   }
//   res.status(204).json({
//     status: "succcess",
//     data: null,
//   });
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log("App running on port");
// });

//////////////Example 2////////////////////////////////////////
// console.log(process.version);
// const mongoose = require("mongoose");
// const express = require("express");
// const app = express();
// const port = 3001; // Choose any port number you prefer

// const url =
//   "mongodb+srv://admin:5dEKCbad9uvARLN5@cluster0.xsiblnd.mongodb.net/cineflix?retryWrites=true&w=majority";

// //connection with DataBase
// mongoose
//   .connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB Connected");
//   })
//   .catch((err) => {
//     console.log("Err", err);
//   });

// //create schema same ad we created in db
// const movieSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "A movie must have name"],
//       unique: true,
//     },
//     releaseyear: String,
//     duration: Number,
//   },
//   {
//     // Add the useCreateIndex option here
//     useCreateIndex: true,
//   }
// );
// // const movieSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: [true, "A movie must have name"],
// //     unique: true,
// //   },
// //   releaseyear: String,
// //   duration: Number,
// // });

// const Movie = mongoose.model("Movie", movieSchema);

// //this object gets inseted into database
// const testMovie = new Movie({
//   name: "Movie3",
//   releaseyear: "2000",
//   duration: 200,
// });

// // with the help of this fun we will insert testMovie obj in db
// testMovie
//   .save()
//   .then((data) => console.log("dtaa", data))
//   .catch((err) => console.log("er", err));

// // Define a route to handle incoming requests
// app.get("/", (req, res) => {
//   res.send("Hello, this is your server Johnnnn !");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

/////////////////EXAMPLE 3//////////////////////////

const express = require("express");
const movieRouter = require("./routes/movieRoute");

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use("/api/v1/movies", movieRouter);

module.exports = app;
