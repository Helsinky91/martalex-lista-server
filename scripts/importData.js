// const fs = require('fs');
// const { MongoClient } = require('mongodb');

// const uri = 'your-mongodb-atlas-uri';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('your-database-name');
//     const collection = database.collection('your-collection-name');

//     // Read JSON file
//     const jsonData = fs.readFileSync('path/to/your/file.json');
//     const documents = JSON.parse(jsonData);

//     // Insert documents into the collection
//     await collection.insertMany(documents);

//     console.log('Data inserted successfully');
//   } finally {
//     await client.close();
//   }
// }

// run();