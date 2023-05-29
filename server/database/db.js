import mongoose from "mongoose";

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password} @blog.302s2gq.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log("Database connected succcessfully");
    } catch (error) {
        console.log("Error while connecting to the database", error);
    }
};

export default Connection;
