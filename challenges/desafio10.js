db.trips.aggregate([{
  $addFields: {
    timeDiference: {
      $subtract: ["$stopTime", "$startTime"],
    },
  },
}, {
  $group: {
    _id: "$usertype",
    avgTravel: { $avg: "$timeDiference" },
  },
}, {
  $addFields: {
    travelHours: { $divide: ["$avgTravel", 1000 * 60 * 60] },

  },
}, {
  $sort: { travelHours: 1 },

}, {
  $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$travelHours", 2] },
  },
},
]);
