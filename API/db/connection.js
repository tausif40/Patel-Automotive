import mongoose from "mongoose";
mongoose.set('strictQuery', true);
const connectDB = async () => {
	try {
		// local connection
		// const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/Showroom`)
		const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/PatelAutomotive`)
		console.log('MongoDB connected...');
		console.log(`HOST : ${connectionInstance.connection.host}\nPORT : ${connectionInstance.connection.port}\n`);
	} catch (error) {
		console.log("MongoDB connection error : " + error);
		process.exit(1)
	}
}

export default connectDB;