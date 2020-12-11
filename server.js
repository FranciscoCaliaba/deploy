const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
//Mongoose
mongoose.connect(
  "mongodb+srv://Francisco:fran1234@cluster0.cxeje.mongodb.net/moviesDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB Connected");
  }
);
//data schema and model
const movieSchema = {
  title: String,
  genre: String,
  year: String,
};

const Movie = mongoose.model("Movie", movieSchema);
//API Routes
app.get("/movies", (req, res) => {
  Movie.find().then((movies) => res.json(movies));
});

app.post("/newmovie", function (req, res) {
  const title = req.body.title;
  const genre = req.body.genre;
  const year = req.body.year;

  const newMovie = new Movie({
    title,
    genre,
    year,
  });

  newMovie.save();
});

app.delete("/delete/:id", function (req, res) {
  const id = req.params.id;
  Movie.findByIdAndDelete({ _id: id }, function (err) {
    if (!err) {
      console.log("Movie deleted successfully.");
    } else {
      console.log(err);
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server is Running");
});
