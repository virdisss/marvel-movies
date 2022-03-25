import express from "express";
import { actorsWithMoreThan, fetchMoviesByActor } from "../controllers/actors";

const router = express.Router();
/**
 * Finds the list of movies that an actor has played in
 *
 * @param name is a query parameter that represents the actor's name
 *
 * @returns an array of strings, each string is the title of the movie the actor has played in
 */
router.get("/search/movie", fetchMoviesByActor);

/**
 * Finds the list of actors that have played more than one characters in the Marvel movies.
 *
 * @param min is query parameter that represents the number of characters that the actor has played
 *
 * @returns a list of objects like so [{name: "actor's name", characters: [char1, char2]}].
 */
router.get("/characters", actorsWithMoreThan);

export default router;
