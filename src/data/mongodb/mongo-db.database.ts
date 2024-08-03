import mongoose from 'mongoose';

interface IOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: IOptions) {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, { dbName });
      console.log('**==== Mongo connected 🛢️  ====**');
    } catch (error) {
      console.log('Mongo connection error ❌');
      throw error;
    }
  }
}
