import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import testRoutes from "./src/routes/test_routes.js";
import authRoutes from "./src/routes/auth_routes.js";
import { syncDatabase } from "./src/database/sequelize.js";


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
//start the service
app.use(morgan("tiny"));

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' })); // or a higher value
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Mount test routes
app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler - must be last middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    // Sync database with models
    await syncDatabase();
    
    // Start the server
    const server = app.listen(PORT, () => {
      console.log("API service started listening on PORT:", PORT);
      console.log("Server is ready to accept requests...");
    });
    
    // Set up graceful shutdown handling
    const gracefulShutdown = (signal) => {
      console.log(`${signal} received, shutting down gracefully`);
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer().catch(error => {
  console.error('Failed to start application:', error);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.error('Stack trace:', err.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  console.error('Stack trace:', reason?.stack);
  process.exit(1);
});

// Keep the process alive
process.on('beforeExit', (code) => {
  console.log('Process is about to exit with code:', code);
});
  