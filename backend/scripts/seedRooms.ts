import { AppDataSource } from "../src/app";
import { Room } from "../src/entity/Room";

async function seed() {
  try {
    // Initialize data source
    await AppDataSource.initialize();

    const roomRepo = AppDataSource.getRepository(Room);

    const rooms = [
      roomRepo.create({ name: "Conference Room A", baseHourlyRate: 100, capacity: 10 }),
      roomRepo.create({ name: "Meeting Room B", baseHourlyRate: 80, capacity: 6 }),
      roomRepo.create({ name: "Private Office C", baseHourlyRate: 120, capacity: 4 }),
    ];

    // Save rooms to the database
    await roomRepo.save(rooms);

    console.log("Rooms seeded successfully");
  } catch (err) {
    console.error("Failed to seed rooms", err);
  } finally {
    // Properly close database connection
    await AppDataSource.destroy();
    process.exit(0);
  }
}

seed();
