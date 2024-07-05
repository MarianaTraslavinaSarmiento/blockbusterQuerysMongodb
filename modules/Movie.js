

import { ObjectId } from "mongodb";
import { connect } from "../helpers/db/connect.js"


export class Movie extends connect{ //hereda las propiedades de la clase connect
    static instance; //Asegura que solo haya una instancia de la clase
    db //Almacena la referencia a la base de datos obtenida desde la conexion establecida en connect

    constructor() {
        super(); //llama al constructor de la clase padre (connect) inicializando la conexion a la bd usando los valores ya establecidos
        this.db = this.conexion.db(this.getDbName);
        this.collection = this.db.collection('movis'); //asigna la base de datos actual (osea this.db) usando el metodo db() de la conexion establecida en connect, usando el nombre de al base de datos obtenido atraves del getter getdbName
        if (typeof Movie.instance === 'object') {
            return Movie.instance;
        }
        Movie.instance = this; //Si no existe la instancia, se establece como this, (la instancia actual de movie)
        return this;
    }

    //Contar el número total de copias de DVD disponibles en todos los registros
    async getAllDVDCopies(){
        await this.reConnect();
        const data = await this.collection.aggregate(
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