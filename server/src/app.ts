import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import expenseRoutes from "./routes/expenseRoutes";

const app = express();
const allowedOrigins = ["https://personal-expense-tracker-kohl.vercel.app","http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, 
  })
);
app.use(express.json());

// Use the expense route
app.use("/api", expenseRoutes);

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exits the process if the database connection fails
  }
})();

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;

