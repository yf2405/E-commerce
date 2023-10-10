import mongoose from 'mongoose';


 export const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/mongodb', { useNewUrlParser: true });
        console.log(">>> db is connected")
    }
    catch (error){
     console.log(error);
    }
};

