const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

// Load env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const User = require('../src/models/User');
const Event = require('../src/models/Event');
const Booking = require('../src/models/Booking');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/event-booking';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    process.stdout.write('Connected to MongoDB for seeding\n');

    // Drop existing data
    await Promise.all([
      User.deleteMany({}),
      Event.deleteMany({}),
      Booking.deleteMany({}),
    ]);
    process.stdout.write('Cleared existing data\n');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    // Create demo users
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        passwordHash,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        passwordHash,
      },
    ]);
    process.stdout.write(`Created ${users.length} demo users\n`);

    // Helper: date N days from now
    const daysFromNow = (days) => {
      const d = new Date();
      d.setDate(d.getDate() + days);
      return d;
    };

    // Create events
    const events = await Event.insertMany([
      {
        name: 'Tech Conference 2025',
        description:
          'Annual technology conference featuring talks from industry leaders on AI, cloud computing, and software engineering best practices.',
        dateTime: daysFromNow(30),
        venue: 'Convention Center, San Francisco',
        totalSeats: 200,
        availableSeats: 200,
        category: 'conference',
        imageUrl: 'https://picsum.photos/seed/event1/800/400',
      },
      {
        name: 'React Workshop',
        description:
          'Hands-on workshop covering React 19, Server Components, and modern state management patterns. Suitable for intermediate developers.',
        dateTime: daysFromNow(14),
        venue: 'Tech Hub, Austin',
        totalSeats: 30,
        availableSeats: 30,
        category: 'workshop',
        imageUrl: 'https://picsum.photos/seed/event2/800/400',
      },
      {
        name: 'Summer Music Festival',
        description:
          'Three-day outdoor music festival featuring rock, pop, and indie artists. Food trucks and camping available on site.',
        dateTime: daysFromNow(45),
        venue: 'Riverside Park, Nashville',
        totalSeats: 500,
        availableSeats: 500,
        category: 'festival',
        imageUrl: 'https://picsum.photos/seed/event3/800/400',
      },
      {
        name: 'Local Basketball Tournament',
        description:
          'Community basketball tournament open to all skill levels. Teams of 5. Prizes for top 3 teams.',
        dateTime: daysFromNow(21),
        venue: 'City Sports Arena, Chicago',
        totalSeats: 150,
        availableSeats: 150,
        category: 'sports',
        imageUrl: 'https://picsum.photos/seed/event4/800/400',
      },
      {
        name: 'AI & Machine Learning Meetup',
        description:
          'Monthly meetup for AI and ML enthusiasts. This month: practical applications of LLMs in production systems.',
        dateTime: daysFromNow(7),
        venue: 'Innovation Lab, Seattle',
        totalSeats: 50,
        availableSeats: 50,
        category: 'meetup',
        imageUrl: 'https://picsum.photos/seed/event5/800/400',
      },
      {
        name: 'Cloud Computing Webinar',
        description:
          'Free webinar on cloud architecture patterns, serverless computing, and cost optimization strategies for AWS and Azure.',
        dateTime: daysFromNow(10),
        venue: 'Online (Zoom)',
        totalSeats: 100,
        availableSeats: 100,
        category: 'webinar',
        imageUrl: 'https://picsum.photos/seed/event6/800/400',
      },
      {
        name: 'Jazz Night Concert',
        description:
          'An evening of smooth jazz with a live band, featuring classic standards and contemporary compositions. Drinks included.',
        dateTime: daysFromNow(60),
        venue: 'Blue Note Lounge, New York',
        totalSeats: 80,
        availableSeats: 80,
        category: 'concert',
        imageUrl: 'https://picsum.photos/seed/event7/800/400',
      },
      {
        name: 'Startup Pitch Day',
        description:
          'Watch 10 early-stage startups pitch to a panel of investors. Networking reception follows. Limited seating — nearly sold out!',
        dateTime: daysFromNow(90),
        venue: 'Venture Hall, Boston',
        totalSeats: 40,
        availableSeats: 3,
        category: 'conference',
        imageUrl: 'https://picsum.photos/seed/event8/800/400',
      },
    ]);
    process.stdout.write(`Created ${events.length} events\n`);

    process.stdout.write('\nSeed completed successfully!\n');
    process.stdout.write('\nDemo accounts:\n');
    process.stdout.write('  john@example.com / password123\n');
    process.stdout.write('  jane@example.com / password123\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    process.stderr.write(`Seed error: ${error.message}\n`);
    process.exit(1);
  }
};

seedDatabase();
