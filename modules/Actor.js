import { ObjectId } from "mongodb";
import { connect } from "../helpers/db/connect.js"


export class Actor extends connect{
    static instance;
    db
    constructor() {
        super();
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection('authors');
        if(typeof Actor.instance === 'object') {
            return Actor.instance;
        }
        Actor.instance = this;
        return this;
    }

    //Encontrar todos los actores que han ganado premios Oscar
    async getactorsWonOscarAward(){
        await this.reConnect()
        const data = await this.collection.aggregate(
            [{$match: {"awards.name": "Oscar Award"}}]
        ).toArray();
        await this.conexion.close();
        return data;
    }

    //Encontrar la cantidad total de premios que ha ganado cada actor
    async totalAwardsActorWon(){
        await this.reConnect()
        const data = await this.collection.aggregate(
            [{$addFields: {awardQuantity: {$size: '$awards'}}}]
        ).toArray()

        await this.conexion.close()
        return data
    }
}