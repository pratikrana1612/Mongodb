const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('fruitsdb');
    const fruits = database.collection('fruits');

    // Query for a movie that has the title 'Back to the Future'
    // const doc = {
    //   title: "Record of a Shriveled Datum",
    //   content: "No bytes, no problem. Just insert a document, in MongoDB",
    // }
    // const forInsert = [
    //   {
    //     name: "Apple",
    //     score: 8,
    //     review: "great fruit"
    //   },
    //   {
    //     name: "Orange",
    //     score: 8,
    //     review: "great fruit"
    //   },
    //   {
    //     name: "Banana",
    //     score: 8,
    //     review: "great fruit"
    //   }
    // ]
    const options = {
      // sort returned documents in ascending order by title (A->Z)
      sort: { title: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      projection: { _id: 0, name: 1, score: 1, review: 1 },
    };


    const result = await fruits.find({},options);
    // if ((await result.countDocuments({})) === 0) {
    //   console.log("No documents found!");
    // }
    for await (const doc of result) {
      console.dir(doc);
    }
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);