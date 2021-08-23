db.trips.aggregate([
  {
    $addFields: {
      timeDiference: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      avgTime: { $avg: "$timeDiference" },

    },
  }, {
    $addFields: {
      timeToMinute: { $divide: ["$avgTime", 1000 * 60] },
    },
  },
  {
    $sort: { timeToMinute: -1 },
  }, {
    $limit: 5,
  }, {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMediaemMinutos: { $ceil: "$timeToMinute" },
    },
  }]);
