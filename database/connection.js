import mongoose from "mongoose";

const conn = async () => {
  try {
    mongoose.set("strictQuery", true);
    const connection = await mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Database is Connected... "))
      .catch(() =>
        console.log("Error: Got some error while connecting  with database!")
      );
  } catch (error) {}
};

export default conn;
