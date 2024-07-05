import { ObjectId } from "mongodb";
import { connect } from "../helpers/db/connect.js";

export class Actor extends connect {
  static instanceActor;
  db;
  constructor() {
    super();
    this.db = this.conexion.db(this.getDbName);
    this.collection = this.db.collection("actor");
    if (typeof Actor.instance === "object") {
      return Actor.instance;
    }
    Actor.instance = this;
    return this;
  }

  //Encontrar todos los actores que han ganado premios Oscar
  async getAllActorsWonOscarAward() {
    await this.conexion.connect();
    const data = await this.collection
      .find({ "awards.name": "Oscar Award" })
      .project({ full_name: 1 })
      .toArray();
    await this.conexion.close();
    return data;
  }

  //Encontrar la cantidad total de premios que ha ganado cada actor
  async totalAwardsActorWon() {
    await this.conexion.connect();
    const data = await this.collection
      .aggregate([{ $addFields: { awardQuantity: { $size: "$awards" } } }])
      .toArray();

    await this.conexion.close();
    return data;
  }

  async getActorsBornAfterDate() {
    await this.conexion.connect();
    const data = await this.collection
      .aggregate([
        {
          $match: {
            date_of_birth: {
              $gt: "1980-12-31",
            },
          },
        },
      ])
      .toArray();
    await this.conexion.close();
    return data;
  }

  async actorWhoHaveMoreAwards() {
    await this.conexion.connect();
    const data = await this.collection
      .aggregate([
        {
          $set: {
            actor_con_mas_premios: {
              $size: "$awards",
            },
          },
        },
        { $sort: { actor_con_mas_premios: -1 } },
        { $project: { actor_con_mas_premios: 0 } },
        { $limit: 1 },
      ])
      .toArray();
    await this.conexion.close();
    return data;
  }

  async getAllActors() {
    await this.conexion.connect();
    const data = await this.collection.countDocuments();
    await this.conexion.close();
    return data;
  }

  async getAllActorsAverageAge() {
    await this.conexion.connect();
    const data = await this.collection
      .aggregate([
        {
          $addFields: {
            edad: {
              $dateDiff: {
                startDate: {
                  $dateFromString: {
                    dateString: "$date_of_birth",
                  },
                },
                endDate: new Date(),
                unit: "year",
              },
            },
          },
        },
        {
          $group: {
            _id: null,
            promedioEdad: { $avg: "$edad" },
          },
        },
      ])
      .toArray();
    await this.conexion.close();
    return data;
  }

  async getAllActorsHaveInstagram() {
    await this.conexion.connect();
    const data = await this.collection
      .aggregate([
        { $unwind: "$social_media" },

        {
          $project: {
            _id: 0,
            full_name: 1,
            instagram: { exists: true },
          },
        },
      ])
      .toArray();
    await this.conexion.close();
    return data;
  }

  async getAllActorsWonAwardsAfterAYear({ year } = { year: 2015 }) {
    await this.conexion.connect();
    const data = await this.collection.find({"awards.year":{$gt: year}}).project({full_name: 1}).toArray();
    await this.conexion.close();
    return data;
  }

  
}
