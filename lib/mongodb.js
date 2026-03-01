import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("⚠️ MONGODB_URI is not set in your environment variables.");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
    // In dev, use a global variable so the connection is preserved across HMR
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;

export async function getDb() {
    const client = await clientPromise;
    return client.db(); // uses the DB name from the connection string
}

// Ensure indexes exist (called lazily on first request)
let indexesCreated = false;
export async function ensureIndexes() {
    if (indexesCreated) return;
    const db = await getDb();

    await Promise.all([
        db.collection("profiles").createIndex({ username: 1 }, { unique: true }),
        db.collection("links").createIndex({ user_id: 1 }),
        db.collection("links").createIndex({ user_id: 1, order_index: 1 }),
        db.collection("click_events").createIndex({ link_id: 1 }),
        db.collection("click_events").createIndex({ clicked_at: 1 }),
    ]);

    indexesCreated = true;
}
