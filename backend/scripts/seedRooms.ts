import { AppDataSource } from "../src/app";
import { Room } from "../src/entity/Room";

async function seed() {
  await AppDataSource.initialize();

  const roomRepo = AppDataSource.getRepository(Room);

  const rooms = [
    roomRepo.create({ name: "Conference Room A", baseHourlyRate: 100, capacity: 10 }),
    roomRepo.create({ name: "Meeting Room B", baseHourlyRate: 80, capacity: 6 }),
    roomRepo.create({ name: "Private Office C", baseHourlyRate: 120, capacity: 4 }),
  ];

  await roomRepo.save(rooms);

  console.log("Rooms seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Failed to seed rooms", err);
  process.exit(1);
});
