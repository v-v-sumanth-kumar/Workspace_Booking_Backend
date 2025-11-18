import { Router } from "express";
import { AppDataSource } from "../app"; // Import from where you initialize DataSource
import { Room } from "../entity/Room";

const router = Router();

// GET /api/rooms - return all rooms
router.get("/", async (req, res) => {
  
    const roomRepo = AppDataSource.getRepository(Room);
    const rooms = await roomRepo.find();
    res.json(rooms);
  
});

export default router;
