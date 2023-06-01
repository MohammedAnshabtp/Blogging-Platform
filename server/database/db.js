import mongoose from "mongoose";

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-rfkkay2-shard-00-00.81ivtdl.mongodb.net:27017,ac-rfkkay2-shard-00-01.81ivtdl.mongodb.net:27017,ac-rfkkay2-shard-00-02.81ivtdl.mongodb.net:27017/?ssl=true&replicaSet=atlas-6ss869-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log("Database connected succcessfully");
    } catch (error) {
        console.log("Error while connecting to the database", error);
    }
};

export default Connection;
