// Find all books in a specific genre
Db.books.find( {genre : "Fiction"} );

// Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } });

// Find books by a specific author
db.books.find({ author: "George Orwell" });

// Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 13.99 } }
);

// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });


// Find books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// Projection: only title, author, price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// Sort books by price ascending
db.books.find().sort({ price: 1 });

// Sort books by price descending
db.books.find().sort({ price: -1 });

// Pagination: page 1 (first 5 books)
db.books.find().limit(5);

// Pagination: page 2 (skip first 5)
db.books.find().skip(5).limit(5);


// Aggregation Pipelines

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avg_price: { $avg: "$price" } } }
]);

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group by decade and count books
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } },
          "s"
        ]
      },
      count: { $sum: 1 }
    }
  }
]);


// Indexing
// Create index on title
db.books.createIndex({ title: 1 });

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// Explain method for performance
db.books.find({ title: "1984" }).explain("executionStats");
