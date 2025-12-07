import { Database } from "../database/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "genero";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: new ObjectId(id) });
};

const create = async (genero) => {
  const collection = await Database(COLLECTION);
  genero.fecha_creacion = new Date();
  genero.fecha_actualizacion = new Date();
  let result = await collection.insertOne(genero);
  return result.insertedId;
};

const update = async (id, genero) => {
  const collection = await Database(COLLECTION);
  genero.fecha_actualizacion = new Date();
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: genero });
  return true;
};

const remove = async (id) => {
  const collection = await Database(COLLECTION);
  await collection.deleteOne({ _id: new ObjectId(id) });
  return true;
};

export const generoService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
