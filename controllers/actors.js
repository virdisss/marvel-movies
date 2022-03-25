import data from "../data/movie_data.json";
import createError from "http-errors";
import axios from "axios";
import { setValue } from "../helpers/cache";

export const fetchMoviesByActor = async (req, res, next) => {
  const actor = req.query.name;
  if (!actor) {
    return next(
      createError.BadRequest(
        "Missing query parameter name, url should be server-url/path?name=actor-name"
      )
    );
  }
  const responses = await fetchMovies();
  const movies = responses
    .filter((response) => {
      return isActorIn(response.data.credits.cast, actor);
    })
    .map((movie) => movie.data.title);

  setValue(req.keyCache, movies);
  res.send(movies);
};

export const actorsWithMoreThan = async (req, res, next) => {
  let numberOfCharacter = parseInt(req.query.min);
  if (!numberOfCharacter) {
    return next(
      createError.BadRequest(
        "Missing query parameter (min) or if query min is given it should be a number"
      )
    );
  }
  const responses = await fetchMovies();

  const actors = data.actors
    .map((actor) => {
      const filteredMovies = responses.filter((response) =>
        isActorIn(response.data.credits.cast, actor)
      );
      return getActorwithCharacters(filteredMovies, actor);
    })
    .filter((result) => {
      return result["characters"].length >= numberOfCharacter;
    });
  setValue(req.keyCache, actors);
  res.send(actors);
};

//------------ Help functions ---------------

const isActorIn = (cast, actor) => {
  for (let c of cast) {
    if (c.name === actor && c.known_for_department === "Acting") {
      return true;
    }
  }
  return false;
};

const fetchMovies = () => {
  const requests = [];
  const movieIds = Object.values(data.movieIds);
  try {
    for (let id of movieIds) {
      requests.push(
        axios.get(
          `${process.env.BASE_URL}/movie/${id}?api_key=${process.env.API_KEY}&append_to_response=credits`
        )
      );
    }
  } catch (e) {
    return next(createError.InternalServerError(e));
  }
  return Promise.all(requests);
};

const getActorwithCharacters = (movies, actor) => {
  const details = [];
  for (let movie of movies) {
    for (let castItem of movie.data.credits.cast) {
      if (
        castItem.name === actor &&
        castItem.known_for_department === "Acting"
      ) {
        details.push(castItem.character);
        break;
      }
    }
  }
  return {
    name: actor,
    characters: [...removeDuplicateCharacters(details)]
  };
};

const removeDuplicateCharacters = (characters) => {
  const filteredCharacters = new Set();
  for (let character of characters) {
    if (
      character.search("uncredited") == -1 &&
      character.search("uncensored") == -1 &&
      character.search("'") == -1 &&
      character.search('"') == -1 &&
      data.characters[character] &&
      !filteredCharacters.has(data.characters[character])
    ) {
      filteredCharacters.add(data.characters[character]);
    }
  }
  return filteredCharacters;
};
