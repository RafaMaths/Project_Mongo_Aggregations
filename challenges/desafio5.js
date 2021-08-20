// use("aggregations");
// db.movies.find();
// const favActors = ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]

// use("aggregations");
// db.movies.aggregate([{
//   $match: {
//     cast: {
//       $in: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"]
//       },
//     countries: "USA",
//     "tomatoes.viewer.rating": {$gte: 3}
//     }
//   }, {
//     $addFields: {
//       num_favs: {
//         $count: 'string'
//       }
//     }
//   }
// ]);

// use("aggregations");
// db.movies.aggregate([
//   {
//     $match: {
//       $and: [
//         { "imdb.rating": { $gte: 7 } },
//         { $nor: [{ genres: "Crime" }, { genres: "Horror" }] },
//         { rated: { $in: ["PG", "G"] } },
//         { languages: { $all: ["English", "Spanish"] } },
//       ],
//     },
//   },
// ]);
