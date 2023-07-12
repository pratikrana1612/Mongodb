const { MongoGridFSChunkError } = require('mongodb');
const mongoose = require('mongoose')


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fruitsdb');
    const fruitsSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Kaya nam nahi pada abhi tak "]
        },
        rating: {
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    });
    const personSchema = new mongoose.Schema({
        name: String,
        age: Number,
        favFruit: fruitsSchema
    })
    const Fruit = mongoose.model('Fruit', fruitsSchema);
    const Person = mongoose.model('Person', personSchema);
    const pineapple = new Fruit({ name: 'Pineapple', rating: 1, review: 'great' })
    const john =await Person.findOneAndUpdate({ name: "John" }, { favFruit: pineapple })
    // const Pratik= new Person({ name: "Pratik", age: 20, favFruit:pineapple})
    // pineapple.save()
    // Pratik.save()
    console.log(john)
    // let doc = await Fruit.findOneAndUpdate({ name: 'banana' }, { name: "dhokda" });
    // console.log(doc) 
    // let temp=await Fruit.deleteMany({name:'kiwi'})
    // console.log(temp)
    // const apple = new Fruit({  rating: 10, review: 'Tapu' })
    // apple.save();
    // console.log(apple)
    // const banana = new Fruit({ name: "banana", rating: 12, review: 'Tapu' })
    // const kiwi = new Fruit({ name: "kiwi", rating: 12, review: 'Tapu' })
    // try {
    //     const result = await Fruit.insertMany([kiwi, banana])
    //     console.log(result || "HO gaya")
    // }
    // catch (err) {
    //     console.log(err)
    // }
    // const result = await Fruit.find({})
    // mongoose.connection.close();
    // for (const f of result) {
    //     console.log(f.name || '')
    // }
    // console.log(result)



    // const john = new Person({ name: "John", age: 23 })
    // john.save()
    // console.log(john)
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main().catch(err => console.log(err));