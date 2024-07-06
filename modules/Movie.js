import { ObjectId } from "mongodb";
import { connect } from "../helpers/db/connect.js";

export class Movie extends connect {
  //hereda las propiedades de la clase connect
  static instanceMovie; //Asegura que solo haya una instancia de la clase
  db; //Almacena la referencia a la base de datos obtenida desde la conexion establecida en connect
  collection;

  constructor() {
    super(); //llama al constructor de la clase padre (connect) inicializando la conexion a la bd usando los valores ya establecidos
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection("movie"); //asigna la base de datos actual (osea this.db) usando el metodo db() de la conexion establecida en connect, usando el nombre de al base de datos obtenido atraves del getter getdbName
    if (Movie.instanceMovie) {
      Movie.instanceMovie;
    }
    Movie.instanceMovie = this; //Si no existe la instancia, se establece como this, (la instancia actual de movie)
  }

  //Contar el número total de copias de DVD disponibles en todos los registros
  async getAllDVDCopies() {
    await this.conexion.connect();
    const data = await this.collection
      .aggregate([
        { $unwind: "$format" },
        { $match: { "format.name": "dvd" } },
        {
          $group: {
            _id: null,
            total_copias_dvd: { $sum: "$format.copies" },
          },
        },
      ])
      .toArray();
    await this.conexion.close();
    return data;
  }

  async getAllDistinctGenreOfMovies() {
    await this.conexion.connect();
    const data = await this.collection.distinct("genre");
    await this.conexion.close();
    return data;
  }

  async getAllMoviesActorOnePerformed({ id } = { id: 1 }) {
    await this.conexion.connect();
    const data = this.collection.find({"character.id_actor":id})
    .project({"name":true})
    .toArray();
    return data;
  }

  async getAllAvailableDVDCopies({ format } = { format: "dvd" }) {
    await this.conexion.connect();
    const data = await this.collection
      .aggregate([
        { $unwind: "$format" },
        { $match: { "format.name": format } },
        {
          $group: {
            _id: null,
            total_valor: {
              $sum: { $multiply: ["$format.value", "$format.copies"] },
            },
          },
        },
      ])
      .toArray();

    await this.conexion.close();
    return data;
  }

  async getAllMoviesWhereJhonPoePerformed({ actor } = { actor: "John Doe" }) {
    await this.conexion.connect();
    const data = await this.collection
      .aggregate([
        { $unwind: "$character" },
        {
          $lookup: {
            from: "actor",
            localField: "character.id_actor",
            foreignField: "id_actor",
            as: "character.id_actor",
          },
        },
        { $unwind: "$character.id_actor" },
        {
          $match: { "character.id_actor.full_name": actor },
        },
      ])
      .toArray();

    await this.conexion.close();
    return data;
  }

  async getAllMoviesWherePrincipalsPerformed({ rol } = { rol: "principal" }) {
    await this.conexion.connect();
    const data = await this.collection.find({"character.rol": rol})
    .toArray();
    await this.conexion.close();
    return data;
  }

  async getAllAwardsOfTheMovies() {
    await this.conexion.connect();
    const data = await this.collection
      .aggregate([
        { $unwind: "$character" },
        {
          $lookup: {
            from: "actor",
            localField: "character.id_actor",
            foreignField: "id_actor",
            as: "actor_info",
          },
        },

        { $unwind: "$actor_info" },

        {
          $set: {
            premios: { $size: "$actor_info.awards" },
          },
        },

        {
          $group: {
            _id: null,
            total_premios: { $sum: "$premios" },
          },
        },
      ])
      .toArray();

    await this.conexion.close();
    return data;
  }

  async getAllBlurayMoviesJohnDoePerformedAnd() {
    await this.conexion.connect();
    const data = await this.collection
      .aggregate([
        { $unwind: "$character" },
        {
          $lookup: {
            from: "actor",
            localField: "character.id_actor",
            foreignField: "id_actor",
            as: "character.id_actor",
          },
        },
        { $unwind: "$character.id_actor" },
        {
          $match: {
            "character.id_actor.full_name": "John Doe",
            "format.name": "Bluray",
          },
        },
        {
          $project: {
            name: 1,
          },
        },
      ])
      .toArray();

    await this.conexion.close();
    return data;
  }

  async getAllSciFiMoviesWhereActorOnePerformed() {
    await this.conexion.connect();
    const data = await this.collection
    .find({genre: "Ciencia Ficción", "character.id_actor": 3}).toArray();

    await this.conexion.close();
    return data;
  }

  async getDVDMovieThatHaveMoreCopies() {
    await this.conexion.connect();
    const data = await this.collection
      .aggregate([
        {
          $unwind: "$format",
        },
        {
          $match: {
            "format.name": "dvd",
          },
        },
        {
          $sort: {
            "format.copies": -1,
          },
        },
        {
          $limit: 1,
        },
      ])
      .toArray();

    await this.conexion.close();
    return data;
  }

  async getTotalValueOfBlurayMovies(){
    await this.conexion.connect()
    const data = await this.collection.aggregate([
        {
          $unwind: "$format"
        },
        {
          $match: {
            "format.name":'Bluray'
          }
        },
        {
          $set: {
            total_valor_copias: {$multiply: ["$format.value","$format.copies"]}
          }
        },
        {
          $group: {
            _id: null,
            count: {
              $sum: "$total_valor_copias"
            }
          }
        }
      ]).toArray()

      await this.conexion.close()
      return data
  }

}
