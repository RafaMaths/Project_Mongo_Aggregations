db.trips.aggregate([{
  $match: {
    startTime: { $gt: new Date("2016-03-09T23:59:59Z"), $lt: new Date("2016-03-11T00:00:00Z") },
  },
},
{
  $addFields: {
    day: {
      $dayOfWeek: "$startTime",
    },
    timeDiference: {
      $subtract: ["$stopTime", "$startTime"],
    },
  },
},
{
  $group: {
    _id: "$day",
    avgTime: { $avg: "$timeDiference" },

  },
}, {
  $addFields: {
    timeToHour: { $divide: ["$avgTime", 1000 * 60] },
  },
}, {
  $project: {
    _id: 0,
    duracaoMediaemMinutos: { $ceil: "$timeToHour" },
  },
}]);
