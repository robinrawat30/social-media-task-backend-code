import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "SOCIAL_MEDIA"
    }).then(() => {
        console.log("Connected to Database.");
    }).catch((error) => {
        console.log(`some error occured while connecting to database : ${error}`);
    })
};

export default dbConnection;