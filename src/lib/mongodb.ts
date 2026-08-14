import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const options = {
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
};

if (!MONGODB_URI) {
  console.warn(
    "MONGODB_URI environment variable is missing in .env.local. Falling back to local store until configured."
  );
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise && MONGODB_URI) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise || (Promise.resolve() as any);
} else {
  if (MONGODB_URI) {
    client = new MongoClient(MONGODB_URI, options);
    clientPromise = client.connect();
  } else {
    clientPromise = Promise.resolve() as any;
  }
}

export default clientPromise;
