db.trips.aggregate([{
  $addFields: {
    dayOfWeek: { $dayOfWeek: "$startTime" },
  },
}, {
  $group: {
    _id: {
      stationStart: "$startStationName",
      dayWeek: "$dayOfWeek",
    },
    countDayOfWeek: { $count: {} },
  },
}, {
  $sort: { countDayOfWeek: -1 },
},
{
  $limit: 1,
},
{
  $project: {
    _id: 0,
    nomeEstacao: "$_id.stationStart",
    total: "$countDayOfWeek",
  },
},
]);
