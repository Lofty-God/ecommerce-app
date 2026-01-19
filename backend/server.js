import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/MongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
// import User from './models/userModel.js'
// import mongoose from 'mongoose';

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
import cors from 'cors';

const allowedOrigins = [
  'https://ecommerce-app-frontend-pearl-ten.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));


// API endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=>console.log('Server is working on PORT: '+ port))