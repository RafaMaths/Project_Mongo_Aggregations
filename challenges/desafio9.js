db.trips.aggregate([{
  $match: {
    birthYear: { $exists: 1, $ne: "" },
  },
}, {
  $addFields: {
    minBornToInt: { $toInt: "$birthYear" },
    maxBornToInt: { $toInt: "$birthYear" },
  } }, {
  $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$maxBornToInt" },
    menorAnoNascimento: { $min: "$minBornToInt" },
  } }, {
  $project: {
    _id: 0,
    maiorAnoNascimento: 1,
    menorAnoNascimento: 1,
  },
}]);
