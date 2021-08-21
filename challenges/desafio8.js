db.air_alliances.aggregate([{
  $unwind: "$airlines",
}, {
  $lookup: {
    from: "air_routes",
    let: { airlineName: "$airlines" },
    pipeline: [
      { $match: {
        $expr: {
          $eq: ["$$airlineName", "$airline.name"],
        },
      } },
    ],
    as: "routesForGroup",
  },
}, {
  $unwind: "$routesForGroup",
}, {
  $match: {
    name: "SkyTeam",
    "routesForGroup.airplane": { $in: ["747", "380"] },
  },
}, {
  $group: {
    _id: "$name",
    somaRotas: { $sum: 1 },
  },
}, {
  $project: {
    totalRotas: { $arrayToObject: "$somaRotas" },
  },
},
]);
