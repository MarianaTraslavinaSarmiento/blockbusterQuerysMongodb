
import { log } from "console";
import { Movie } from "./modules/Movie.js";
import { Actor } from "./modules/Actor.js"

// let objMovie = new Movie();
let objActor = new Actor()

// console.log(await objMovie.getAllDVDCopies());

console.log(await objActor.totalAwardsActorWon());
