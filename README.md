# Consultas Blockbuster

1. **Contar el número total de copias de DVD disponibles en todos los registros:**

   ```javascript
   db.movie.aggregate([
     {$unwind: '$format'},
     {$match: {'format.name':'dvd'}},
     {$group: {
       _id: null,
       total_copias_dvd: {$sum: "$format.copies"}}}
   ])
   ```

2. **Encontrar todos los actores que han ganado premios Oscar:**

   ```javascript
   db.actor.find({ "awards.name": "Oscar Award" }, {full_name: 1}).
   ```

3. **Encontrar la cantidad total de premios que ha ganado cada actor:**

   ```javascript
   db.actor.aggregate([{$addFields: {awardQuantity: {$size: '$awards'}}}])
   ```

4. **Obtener todos los actores nacidos después de 1980:**

   ```javascript
   db.actor.aggregate([
       {$match: {
         'date_of_birth': {
           $gt: '1980-12-31'}}}
   ])
   ```

5. **Encontrar el actor con más premios:**

   ```javascript
   db.actor.aggregate([
     {$set:{
         'actor_con_mas_premios':{
           $size: '$awards'}}},
     {$sort:{'actor_con_mas_premios': -1}},
     {$project:{'actor_con_mas_premios': 0}},
     {$limit: 1}
   ])
   ```

6. **Listar todos los géneros de películas distintos:**

   ```javascript
   db.movie.distinct("genre")
   ```

7. **Encontrar películas donde el actor con id 1 haya participado:**

   ```javascript
   db.movie.find({"character.id_actor":1},{"name":1})
   ```

8. **Calcular el valor total de todas las copias de DVD disponibles:**

   ```javascript
   db.movie.aggregate([
        { $unwind: "$format" },
        { $match: { "format.name": 'dvd' } },
        {
          $group: {
            _id: null,
            total_valor: {
              $sum: { $multiply: ["$format.value", "$format.copies"] },
            },
          },
        },
      ])
   ```

9. **Encontrar todas las películas en las que John Doe ha actuado:**

   ```javascript
   db.movie.aggregate([
     {$unwind: '$character'},
     {$lookup: {
         from: 'actor',
         localField: "character.id_actor",
         foreignField: 'id_actor',
         as: "character.id_actor"}
     },
     {$unwind: '$character.id_actor'},
     {$match: {'character.id_actor.full_name': "John Doe"}
     }
   ])
   ```

10. **Encontrar el número total de actores en la base de datos:**

    ```javascript
    db.actor.countDocuments()
    ```

11. **Encontrar la edad promedio de los actores en la base de datos:**

    ```javascript
    db.actor.aggregate([
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
    ```

12. **Encontrar todos los actores que tienen una cuenta de Instagram:**

    ```javascript
    db.actor.aggregate([
      { $unwind: "$social_media" },
    
      {
        $project: {
          _id: 0,
          full_name: 1,
          instagram: { exists: true },
        },
      },
    ])
    ```

13. **Encontrar todas las películas en las que participan actores principales:**

    ```javascript
    db.movie.find({"character.rol": "principal"})
    ```

14. **Encontrar el número total de premios que se han otorgado en todas las películas:**

    ```javascript
    db.movie.aggregate([
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
    ```

15. **Encontrar todas las películas en las que John Doe ha actuado y que estén en formato Blu-ray:**

    ```javascript
     db.movie.aggregate([
     {$unwind: '$character'},
     {$lookup: {
         from: 'actor',
         localField: "character.id_actor",
         foreignField: 'id_actor',
         as: "character.id_actor"}
     },
     {$unwind: '$character.id_actor'},
     {$match: {$and: [{'character.id_actor.full_name': "John Doe"},{'format': 'Bluray'}]}
     }
      ])
    ```

16. **Encontrar todas las películas de ciencia ficción que tengan al actor con id 3:**

    ```javascript
    db.movie.find({genre: "Ciencia Ficción", "character.id_actor": 3})
    ```

17. **Encontrar la película con más copias disponibles en formato DVD:**

    ```javascript
    db.movie.aggregate([
      {
        $unwind: "$format"
      },
      {
        $match: {
          "format.name": "dvd"
        }
      },
      {
        $sort: {
          "format.copies": -1
        }
      },
      {
        $limit: 1
      }
    ])
    ```

18. **Encontrar todos los actores que han ganado premios después de 2015:**

    ```javascript
    db.actor.find({"awards.year": {$gt: 2015}},{"full_name":1})
    ```

19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**

    ```javascript
    db.movie.aggregate([
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
    ])
    ```

20. **Encontrar todas las películas en las que el actor con id 2 haya participado:**

    ```javascript
    db.movie.find({"character.id_actor":2},{"name":1})
    ```