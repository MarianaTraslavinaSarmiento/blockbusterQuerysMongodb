
import { log } from "console";
import { Movie } from "./modules/Movie.js";

let objMovis = new Movie();
console.log(await objMovis.getAllDVDCopies());
