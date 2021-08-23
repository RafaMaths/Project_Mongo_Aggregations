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
      duracaoMedia: { $ceil: { $divide: ["$avgTime", convertToMinutes] } },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]);
