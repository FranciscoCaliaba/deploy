import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [movies, setMovies] = useState([
    {
      title: "",
      genre: "",
      year: "",
    },
  ]);

  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    year: "",
  });

  useEffect(() => {
    fetch("/movies")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonResponse) => {
        setMovies(jsonResponse);
      });
  }, [movies]);

  function handleChange(event) {
    const { name, value } = event.target;
    setMovie((prevInput) => {
      return { ...prevInput, [name]: value };
    });
    console.log(movie);
  }
  function addMovie(event) {
    event.preventDefault();
    const newMovie = {
      title: movie.title,
      genre: movie.genre,
      year: movie.year,
    };
    axios.post("/newmovie", newMovie);
    alert("Movie Added");
  }
  function deleteMovie(id) {
    axios.delete(`/delete/${id}`);
    alert("Movie Deleted");
  }

  return (
    <div className="App">
      <h1>Add Movie</h1>
      <form>
        <input onChange={handleChange} name="title" value={movie.title}></input>
        <input onChange={handleChange} name="genre" value={movie.genre}></input>
        <input onChange={handleChange} name="year" value={movie.year}></input>
        <button onClick={addMovie}>ADD MOVIE</button>
      </form>
      {movies.map((movie) => {
        return (
          <div>
            <h1>{movie.title}</h1>
            <p>{movie.genre}</p>
            <p>{movie.year}</p>
            <button onClick={() => deleteMovie(movie._id)}>DELETE</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
