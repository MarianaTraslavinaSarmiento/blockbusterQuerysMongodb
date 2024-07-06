
import { log } from "console";
import { Movie } from "./modules/Movie.js";
import { Actor } from "./modules/Actor.js"

// let objMovie = new Movie();
let obj 

obj = new Movie()
// console.log(`1.Contar el número total de copias de DVD disponibles en todos los registros`,await obj.getAllDVDCopies())
// console.log(`6. Listar todos los géneros de películas distintos`,await obj.getAllDistinctGenreOfMovies())
// console.log(`7.Encontrar películas donde el actor con id 1 haya participado`, await obj.getAllMoviesActorOnePerformed())
// console.log(`8.Calcular el valor total de todas las copias de DVD disponibles`, await obj.getAllAvailableDVDCopies())
// console.log(`9.Encontrar todas las películas en las que John Doe ha actuado`, await obj.getAllMoviesWhereJhonPoePerformed())
// console.log(`13.Encontrar todas las películas en las que participan actores principales`,await obj.getAllMoviesWherePrincipalsPerformed())
// console.log(`14.Encontrar el número total de premios que se han otorgado en todas las películas`,await obj.getAllAwardsOfTheMovies())
// console.log(`15.Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray`, await obj.getAllBlurayMoviesJohnDoePerformedAnd())
console.log(`16.Encontrar todas las películas de ciencia ficción que tengan al actor con id 3`, await obj.getAllSciFiMoviesWhereActorOnePerformed())
// console.log(`17.Encontrar la película con más copias disponibles en formato DVD`, await obj.getDVDMovieThatHaveMoreCopies())
// console.log(`19.Calcular el valor total de todas las copias de Blu-ray disponibles`,await obj.getTotalValueOfBlurayMovies())
// console.log(`20.Encontrar todas las películas en las que el actor con id 2 haya participado`, await obj.getAllMoviesActorOnePerformed({id: 2}))

obj.destructor()

obj = new Actor()
// console.log(`2.Encontrar todos los actores que han ganado premios Oscar`,await obj.getAllActorsWonOscarAward());
// console.log(`3.Encontrar la cantidad total de premios que ha ganado cada actor`,await obj.totalAwardsActorWon());
// console.log(`4. Obtener todos los actores nacidos después de 1980`, await obj.getActorsBornAfterDate())
// console.log(`5.Encontrar el actor con más premios`,await obj.actorWhoHaveMoreAwards())
// console.log(`10.Encontrar el número total de actores en la base de datos`, await obj.getAllActors())
// console.log(`11. Encontrar la edad promedio de los actores en la base de datos`, await obj.getAllActorsAverageAge())
// console.log(`12.Encontrar todos los actores que tienen una cuenta de Instagram`,await obj.getAllActorsHaveInstagram())
console.log(`18.Encontrar todos los actores que han ganado premios después de 2015:`,await obj.getAllActorsWonAwardsAfterAYear())
obj.destructor()



