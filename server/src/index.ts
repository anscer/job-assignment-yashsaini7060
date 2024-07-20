import express from 'express';
import session from 'express-session';
import passport from 'passport';
import stateRoutes from './routes/stateRoutes';
import authRoutes from './routes/authRoutes';
import connectDB from './config/db';
import './strategies/local-strategy'
import * as dotenv from "dotenv";


dotenv.config();
const app = express();

// Connect to MongoDB
connectDB()

// Middleware
app.use(express.json());

app.use(
    session({ 
        secret: process.env.SECRET || 'secret', 
        resave: false, 
        saveUninitialized: false ,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // Equals 1 day
        }
    }));

    
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1/states', stateRoutes);
app.use('/api/v1/auth', authRoutes);


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
