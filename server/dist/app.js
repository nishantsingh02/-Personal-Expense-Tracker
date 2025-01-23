"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const expenseRoutes_1 = __importDefault(require("./routes/expenseRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use(express_1.default.json());
// Use the expense route
app.use("/api", expenseRoutes_1.default);
const prisma = new client_1.PrismaClient;
try {
    prisma.$connect();
    console.log("Database connected successfully!");
}
catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exits the process if the database connection fails
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
exports.default = app;
