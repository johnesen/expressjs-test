import mongoose, { ConnectOptions, Error } from "mongoose";


mongoose.set("strictQuery", true);

export const connectDB = (MONGODB_URI: any): Promise<typeof mongoose> => {
  mongoose.connection.on("connected", () => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
      console.log("MongoDB database connection established succesfully");
    }
  });

  mongoose.connection.on("reconnected", () => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
      console.log("MongoDB connection distablished");
    }
  });

  mongoose.connection.on("error", (error: Error) => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
      console.log("MongoDB connection error. Please make sure MongoDB is running");
      console.log("MongoDB connection error: ", error);
    }
  });

  mongoose.connection.on("close", () => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
      console.log("MongoDB connection is closed");
    }
  });

  mongoose.connection.on("disconnected", () => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
      console.log("MongoDB connection is disconnedted");
      console.log("Trying to reconnect...");
    }

    setTimeout(() => {
      mongoose.connect(MONGODB_URI, {
        keepAlive: true,
        socketTimeoutMS: 3000,
        connectTimeoutMS: 3000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    }, 3000);
  });


  mongoose.connect(MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  return mongoose.connect(MONGODB_URI);

};


export default connectDB;
