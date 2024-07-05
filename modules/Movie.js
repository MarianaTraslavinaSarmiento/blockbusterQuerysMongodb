

import { ObjectId } from "mongodb";
import { connect } from "../helpers/db/connect.js"


export class Movie extends connect{
    static instance;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        if (typeof Movie.instance === 'object') {
            return Movie.instance;
        }
        Movie.instance = this;
        return this;
    }

    //Contar el número total de copias de DVD disponibles en todos los registros
    async getAllDVDCopies(){
        const collection = this.db.collection('movis');
        const data = await collection.aggregate(
            [
                {$unwind: '$format'},
                {$match: {'format.name':'dvd'}},
                {$group: {
                  _id: null,
                  total_copias_dvd: {$sum: "$format.copies"}}}
              ]
        ).toArray();
        await this.conexion.close();
        return data;
    }

    
}