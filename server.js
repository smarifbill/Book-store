let express = require("express");
let path = require("path");
let app = express();

//use images & css files in static folder.
app.use("/static", express.static(path.join(__dirname, "static")));

//set EJS as templating engine
app.set("view engine", "ejs");

//temp DB or table data
let db = [
  /*
   */
  { username: "Kim", title: "5 Little Ducks" },
  { username: "Sandy", title: "5 Little Ducks" },
  { username: "Kim", title: "Three Musketeers" },
  { username: "Tim", title: "Cat in Boots" },
  { username: "May", title: "Three Musketeers" },
  { username: "Wendy", title: "Three Musketeers" },
];

//console.log(db);

//route - home
app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "index.html"));
});

//route that creates and saves the data to the fake db
app.get("/create", function (request, response) {
  let books = {
    username: request.query.username,
    title: request.query.book,
  };
  db.push(books);
  //console.log(db);

  response.send("Record added to temp database");
});

//route to show data in array - temp db
app.get("/getData", function (request, response) {
  //count the number of books that appears most in temp DB
  let count = db.reduce(
    (acc, o) => ((acc[o.title] = (acc[o.title] || 0) + 1), acc),
    {}
  );

  //convert to array
  let entries = Object.entries(count);
  //use array sort method to sort from highest to lowest
  let sorted = entries.sort((a, b) => b[1] - a[1]);

  //convert a list of key-value pairs into an object
  //using for - in loop in ejs file to loop over object
  let result = Object.fromEntries(sorted);

  //display data in array to html table
  response.render("data", { db: db, result });
});

app.listen(3000);
console.log("Server is running at http://localhost:3000");
