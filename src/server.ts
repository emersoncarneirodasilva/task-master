import "dotenv/config";
import cors from "cors";
import express from "express";
import userRoutes from "./routes/userRouter";
import taskRoutes from "./routes/taskRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api", categoryRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando no endereço: http://localhost:${PORT}`);
});
