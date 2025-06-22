import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const ConnectMongoose = async () => {
  try {

    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Successfully connected to MongoDB Atlas");
  } catch (error) {

    console.error("Error connecting to MongoDB:", error.message);

    if (error.message.includes('IP address')) {
      console.error("It seems your IP address isn't whitelisted. Please whitelist your IP in MongoDB Atlas.");
    }
 
    process.exit(1); 
  }
};

export default ConnectMongoose;
