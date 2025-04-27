import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes";
import authRoutes from './routes/auth';
import milestoneRoutes from './routes/milestoneRoutes'

// Load environment variables
dotenv.config();

const app = express();
const allowedOrigins = [
  "https://personal-expense-tracker-kohl.vercel.app",
  "https://personal-expense-tracker-xi.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173"
];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use("/api", expenseRoutes);
app.use("/api", milestoneRoutes);

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  res.status(500).json({ error: 'Internal server error' });
});

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
  console.log(`JWT_SECRET is set: ${!!process.env.JWT_SECRET}`);
});

export default app;

