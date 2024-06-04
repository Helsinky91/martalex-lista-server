const fs = require('fs');
const { MongoClient } = require('mongodb');
// require('dotenv').config();
require('dotenv').config({ path: './.env' });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db('martalex-cosplaylist'); 
    const collection = database.collection('cosplays'); 

    // Read JSON file
    const jsonData = fs.readFileSync('./scripts/martalexCosplays.json'); 
    const documents = JSON.parse(jsonData); 

    // Insert documents into the collection
    await collection.insertMany(documents);
    console.log('Data inserted successfully');
    
} catch (error) {
  console.error('Error:', error);
} finally {
  await client.close();
}
}

run();