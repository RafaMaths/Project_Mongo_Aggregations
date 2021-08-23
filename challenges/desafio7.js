db.movies.aggregate([{
  $match: {
    languages: { $all: ["English"] },
    cast: { $exists: 1 },
  },
}, {
  $unwind: "$cast",
}, {
  $group: {
    _id: "$cast",
    numeroFilmes: { $sum: 1 },
    avgIMDB: { $avg: "$imdb.rating" },
  },
}, {
  $sort: { numeroFilmes: -1, cast: -1 },
}, {
  $project: {
    _id: 1,
    numeroFilmes: 1,
    mediaIMDB: { $round: ["$avgIMDB", 1] },
  },
}]);
