import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    // cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    //     dbName: 'saraf',
    //     bufferCommands: false,
    // })

    // cached.conn = await cached.promise;

    // return cached.conn;

    if (!cached.promise) {
        const opts = {
            dbName: 'saraf',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useFindAndModify: false,
            useCreateIndex: true,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}