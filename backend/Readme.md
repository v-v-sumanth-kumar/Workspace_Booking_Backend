Core Components and Flow
1. app.ts - Entry Point & Server Setup
Initializes environment variables via dotenv.
Sets up an Express app with CORS and JSON parsing middleware.
Configures TypeORM DataSource with Postgres DB connection info and entity registration.
On successful DB connection initialization:
Mounts routes for rooms, bookings, and analytics under /api.
Starts the server on the specified port.
Logs errors if DB connection fails.

2. Entity Models
Room.ts
Represents workspace rooms.
Fields: id (UUID), name (string), baseHourlyRate (int), and capacity (int).
Booking.ts
Represents bookings of rooms.
Fields include id (UUID), userName (string), references roomId and associated Room, start/end times, totalPrice, and status.

3. Routes and Controllers
roomRoutes.ts
GET /api/rooms: Fetches all room records from Room table and returns as JSON.
bookingRoutes.ts
POST /api/bookings: Creates a new booking after validating the room existence and stores it.
DELETE /api/bookings/:id: Cancels a booking by updating its status to "CANCELLED".
analyticsRoutes.ts
GET /api/analytics:
Fetches all rooms and associated confirmed bookings.
Aggregates total booking hours and revenue per room.
Returns analytics data as JSON.

4. DataSource / Repository Management
Uses TypeORM DataSource with explicit repository fetching via AppDataSource.getRepository(Entity).
Synchronizes schema automatically on startup.
Ensures entities are correctly registered for repository operations.

5. Error Handling
Each route handler uses try-catch to catch DB and runtime errors.
Proper HTTP response codes are returned:
400 for invalid inputs.
404 when records not found.
500 for internal errors with error messages included in JSON responses.

6. Database Seeding (Manual Data Entry)
Recommended to seed room data using a TypeScript script (seedRooms.ts).
Script connects to DB using same AppDataSource.
Creates and saves initial room records.
Run this script with TS-node to add rooms for testing and usage.

Typical Request Flow Example
Client requests GET /api/rooms.
Server fetches rooms from DB using Room repository.
Server responds with JSON array of rooms.
Client sends POST /api/bookings with booking details.
Server validates room exists.
Calculates price, creates booking record.
Server saves booking and responds with created booking.

Summary
This backend organizes workspace booking logic with clear separation of concerns, robust error handling, and uses TypeORM ORM features fully in sync with PostgreSQL. Manual data insertion via seed scripts enables testing and bootstrapping.

DB_HOST=dpg-d4e4bg1r0fns73bfuoa0-a.oregon-postgres.render.com
DB_PORT=5432
DB_USERNAME=sumanth
DB_PASSWORD=IVAar3jcc0Z6zw4VFx4oWPtNjcyWmskr
DB_DATABASE=workspace_booking_db
PORT=5000
