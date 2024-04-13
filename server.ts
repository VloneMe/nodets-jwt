import express, { Express } from "express";
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoDB = require('./src/config/mongodb');
const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middleware/authMiddleware')


mongoDB()

const server_port = 5000 || 4000
const server: Express = express();


// Middleware
server.use(express.json());
server.use(cors())
server.use(cookieParser());


// API Routes
server.use("/auth/", require('./src/routes/authRoutes'));


// Server Connection
server.listen(server_port, () => {
    console.log(`[server]: Running at http://localhost:${server_port}`)
});