use("aggregations");
db.trips.aggregate([
  {
    $match: {
      startTime: { $gt: new Date("2016-03-09T23:59:59Z"), $lt: new Date("2016-03-11T00:00:00Z") },
    },
  },
  {
    $group: {
      _id: null,
      avgTime: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaemMinutos: { $ceil: { $divide: ["$avgTime", 1000 * 60] } },
    },
  },
]);
