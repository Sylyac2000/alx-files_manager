#!/usr/bin/env node

import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(this.url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(this.database);
    }).catch((err) => {
      console.log(err);
    });
  }

  isAlive() {
    return this.client.isConnected();
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
