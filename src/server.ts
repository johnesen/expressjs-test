/* eslint-disable no-restricted-syntax */
import app from "./app";
import { connectDB, environmentConfig } from "./configs";


export const startServer = async (): Promise<void> => {
  try {
    const conn = await connectDB(
      environmentConfig.MONGODB_CONNECTION_STRING,
    );
    console.log("MongoDB database connection established successfully to... ", conn.connection.host);

    app.listen(environmentConfig.PORT, () => {
      console.log("Server is listening on port: https:localhost:" + environmentConfig.PORT.toString());
    });
  } catch (error) {
    console.log("MongoDB connection error. Please make sure MongoDb is running");

  }
};

startServer();

export default app;
