const milisecondsToHour = 3600000;

db.trips.aggregate([{
  $group: {
    _id: "$usertype",
    avgTravel: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
  },
}, {
  $addFields: {
    travelHours: { $divide: ["$avgTravel", milisecondsToHour] },

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
