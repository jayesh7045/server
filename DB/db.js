import mongoose from "mongoose"

export const connectDB = async(dbURI)=>{
    try{
        const connection = await mongoose.connect(dbURI)
        console.log("Successfully Connected to Database")
        return connection.connection
    }
    catch(error)
    {
        console.error('Error connecting to the database:', error.cause);
        process.exit(1); 
    }
}