import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(
      `Connection esteblished with ${connect.connection.host}`.bgCyan
    );
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

export default connectDb;
