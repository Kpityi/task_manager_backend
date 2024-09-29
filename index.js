import "dotenv/config";
import express from "express";
import cors from "cors";
import { PORT } from "./common/environment.js";
import tasksRoutes from "./routes/tasks.js";
import testRoutes from "./routes/test.js";

const app = express();

app.use(
  cors({
    origin: "*", // Specifies which domains are allowed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // If you want to send credentials (e.g., cookies)
  })
);

// Apply the rate limiting middleware to all requests.
app.use(express.static("public"));

app.use(express.json());

app.use("/api/tasks", tasksRoutes);
app.use("/test", testRoutes);

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT} port`);
});
