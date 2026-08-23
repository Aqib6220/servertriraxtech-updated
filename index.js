const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

dotenv.config();

// Connect to Database
connectDB();

const app = express();

const apiRoutes = require("./routes/apiRoutes");

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: [
      "https://triraxtech.com",
      "https://www.triraxtech.com",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(helmet());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("TriraxTech API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
