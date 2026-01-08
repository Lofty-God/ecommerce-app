import mongoose from 'mongoose';
const connectDB = async () =>{
    mongoose.connection.on('connected', ()=>{
        console.log('DB Connected')
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/tailwind-project`)
}
export default connectDB