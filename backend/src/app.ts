import "reflect-metadata";
import express from "express";
import cors from "cors";
import { DataSource } from "typeorm";
import roomRoutes from "./routes/roomRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgrespassword",
  database: process.env.DB_DATABASE || "workspace_booking_db",
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entity/*.ts"], // Ensure .ts if running in TS, .js if in JS
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data source initialized");
    app.use("/api/rooms", roomRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/analytics", analyticsRoutes);

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

export default app;
