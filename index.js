const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const courseRouter = require("./routes/course");
const authenticate = require("./middleware/authMiddleware");

var app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://agent-007:delase@cluster0.ejg5rih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());

// Define routes (we'll add these later)
app.use("/api/auth", authRouter);
app.use("/api/courses", authenticate, courseRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
