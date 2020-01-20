const mongoose = require("mongoose");
const { mongoURI } = require("./default");

/** Connecting Mongoose to MongoDB */
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with a failure
  }
};

module.exports = connectDB;
