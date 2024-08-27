const redis = require('redis');

// Create a new Redis client instance
const client = redis.createClient({
  url: 'redis://localhost:6379', // Redis server URL (can include host and port)
});

// Handle connection errors
client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

// Connect to Redis
client.connect().catch(console.error);

module.exports = client;
