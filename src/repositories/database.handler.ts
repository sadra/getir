import { ConnectionOptions, connect } from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.error('❗️[Error]: There is no configs for Mongo DB');
    process.exit();
  }

  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(process.env.MONGO_URL, options);
    console.log('📦[Database]: MongoDB is connected.');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
