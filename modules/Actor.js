// import { ObjectId } from "mongodb";
// import { connect } from "../helpers/db/connect.js"


// export class Actor extends connect{
//     static instance;
//     db
//     constructor() {
//         super();
//         this.db = this.conexion.db(this.getDbName);
//         if (typeof Movie.instance === 'object') {
//             return Movie.instance;
//         }
//         Movie.instance = this;
//         return this;
//     }
//     async getCountDvd(){
//         const collection = this.db.collection('movis');
//         const data = await collection.find(
//             {
//                 format: { 
//                     $elemMatch: 
//                     {name: {$eq: "dvd"}}
//                 }
//             }
//         ).toArray();
//         await this.conexion.close();
//         return {countByMoviDVD: data.length};
//     }
// }