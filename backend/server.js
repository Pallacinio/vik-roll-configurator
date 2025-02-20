const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); 
app.use("/api/orders", orderRoutes); 

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));