import sha1 from 'sha1';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const { ObjectId } = require('mongodb');

class UsersController {
  static async postNew(request, response) {
    const newEmail = request.body.email;
    if (!newEmail) return response.status(400).send({ error: 'Missing email' });

    const newPassword = request.body.password;
    if (!newPassword) return response.status(400).send({ error: 'Missing password' });

    const oldEmail = await dbClient.db.collection('users').findOne({ email: newEmail });
    if (oldEmail) return response.status(400).send({ error: 'Already exist' });

    const passwordHash = sha1(newPassword);

    const resultat = await dbClient.db.collection('users').insertOne({ email: newEmail, password: passwordHash });
    return response.status(201).send({ id: resultat.insertedId, email: newEmail });
  }

  static async getMe(request, response) {
    const token = request.header('X-Token') || null;

    if (!token) return response.status(401).send({ error: 'Unauthorized' });

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) return response.status(401).send({ error: 'Unauthorized' });

    const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(userId) });
    if (!user) return response.status(401).send({ error: 'Unauthorized' });

    delete user.password;
    return response.status(200).send({ id: user._id, email: user.email });
  }
}

module.exports = UsersController;
