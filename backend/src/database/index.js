import { MongoClient } from 'mongodb';
import debugLib from "debug";
import { Config } from "../config/index.js";

const debug = debugLib("app:module-database");

let connection = null;

export const Database = async (collection) => {
  try {
    if (!connection) {
      const client = new MongoClient(Config.mongoUri); 
      connection = await client.connect();
      debug("Nueva conexión realizada con MongoDB Atlas");
    }

    debug("Reutilizando conexión existente");
    const db = connection.db(Config.mongoDbname);
    return db.collection(collection);
  } catch (error) {
    throw error;
  }
};
