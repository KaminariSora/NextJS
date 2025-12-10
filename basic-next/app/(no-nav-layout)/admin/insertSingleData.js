const { MongoClient, ObjectId } = require('mongodb');
const { generateEmbedding } = require('./embedding');

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

if (!MONGO_URI || !DB_NAME) {
    throw new Error("MONGO_URI and DB_NAME must be defined in environment variables.");
}

const client = new MongoClient(MONGO_URI);

const newObjectId = new ObjectId();
console.log("--Generating object Id")
const isAsString = newObjectId.toHexString();
console.log("Value: ", isAsString)

/**
 * * @param {object} productData 
 */
async function upsertProduct(productData) {
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        console.log("Generating embedding...");
        const nameEmbedding = await generateEmbedding(productData.name)
        const descriptionEmbedding = await generateEmbedding(productData.description);
        const genreEmbedding = await generateEmbedding(productData.genre)
        console.log("Embedding generated successfully.");
        
        let filter = {};
        
        if (productData._id) {
            filter = { _id: new ObjectId(productData._id) }; 
        } else {
            filter = { name: productData.name }; 
        }

        const updateDocument = {
            $set: { 
                name: productData.name,
                price: productData.price,
                description: productData.description,
                stock: productData.stock,
                image: productData.image,
                genre: productData.genre,
                name_embedding: nameEmbedding,
                description_embedding: descriptionEmbedding,
                genre_embedding: genreEmbedding
            }
        };

        const result = await collection.updateOne( 
            filter,
            updateDocument,
            { upsert: true }
        );

        return {
            matched: result.matchedCount,
            upserted: result.upsertedId,
            modified: result.modifiedCount,
            message: 'Product upsert successful'
        };
    } catch (e) {
        console.error("Error in upsertProduct:", e);
        throw e;
    } finally {
        await client.close(); 
    }
}

module.exports = {
    upsertProduct
}