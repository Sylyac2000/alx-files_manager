#!/usr/bin/env node
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    // Create a Redis client instance"
    this.client = createClient();
    // Log any Redis client error to the console
    this.client.isconnected = true;
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to server: ${err}`);
      this.client.isconnected = false;
    });

    this.client.on('connect', () => {
      this.client.isconnected = true;
    });
  }

  isAlive() {
    if (this.client.isconnected) {
      return true;
    }
    return false;
  }

  async get(key) {
    // Return the Redis value stored for the specified key
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async set(key, value, duration) {
    // Store the specified value in Redis with an expiration set by the duration argument
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async del(key) {
    // Remove the value in Redis for the specified key
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

// Create and export an instance of the RedisClient class
const redisClient = new RedisClient();
export default redisClient;
