const convertToMinutes = 60000;
db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      avgTime: { $avg: { $subtract: ["$stopTime", "$startTime"] } },

    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMediaemMinutos: { $ceil: { $divide: ["$avgTime", convertToMinutes] } },
    },
  },
  {
    $sort: { duracaoMediaemMinutos: -1 },
  },
  {
    $limit: 5,
  },
]);
