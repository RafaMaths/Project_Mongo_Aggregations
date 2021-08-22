db.trips.aggregate([{
  $addFields: {
    dayOfWeek: { $dayOfWeek: "$startTime" },
  },
}, {
  $group: {
    _id: "$dayOfWeek",
    totalDays: { $count: {} },
  },
}, {
  $sort: { totalDays: -1 },
}, {
  $limit: 1,
}, {
  $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$totalDays",
  },
}]);
