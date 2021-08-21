db.trips.aggregate([{
  $match: {
    birthYear: { $exists: 1, $ne: "" },
  },
}, {
  $addFields: {
    bornToInt: { $toInt: "$birthYear" },
  } }, {
  $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$bornToInt" },
    menorAnoNascimento: { $min: "$bornToInt" },
  } }, {
  $project: {
    _id: 0,
    maiorAnoNascimento: 1,
    menorAnoNascimento: 1,
  },
}]);
