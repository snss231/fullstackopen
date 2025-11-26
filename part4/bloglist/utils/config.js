
require('dotenv').config()
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')

async function initializeMongoose() {
  if (process.env.NODE_ENV != 'test' && !process.env.MONGODB_URI) {
    console.warn("No MONGODB_URI configured, starting in-memory server...");
    mongoServer = await MongoMemoryServer.create();
    console.log("Mongo memory server initialized: " + mongoServer.getUri())
    process.env.MONGODB_URI = mongoServer.getUri();
  }

  await mongoose.connect(process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI);

  console.log('Mongoose connected.')
}

async function getMongoUri() {
  if (!process.env.MONGODB_URI) {
    console.warn("No MONGODB_URI configured, starting in-memory server");
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
  }

  return process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
}

module.exports = { getMongoUri, initializeMongoose }