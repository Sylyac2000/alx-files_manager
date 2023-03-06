#!/usr/bin/env node

import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
    // this.db = this.client.db(database);
  }

  async isAlive() {
    return this.client.isConnected();
    /* const result = await this.client.db().admin().ping();
    return result.ok === 1; */
  }

  async nbUsers() {
    const nbUsers = await this.db.collection('users').countDocuments();
    return nbUsers;
  }

  async nbFiles() {
    const nbFiles = await this.db.collection('files').countDocuments();
    return nbFiles;
  }
}

const dbClient = new DBClient();

export default dbClient;
