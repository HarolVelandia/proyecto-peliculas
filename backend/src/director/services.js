import { Database } from "../database/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "director";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: new ObjectId(id) });
};

const create = async (director) => {
  const collection = await Database(COLLECTION);
  director.estado = director.estado || "Activo";
  director.fecha_creacion = new Date();
  director.fecha_actualizacion = new Date();
  let result = await collection.insertOne(director);
  return result.insertedId;
};

const update = async (id, director) => {
  const collection = await Database(COLLECTION);
  director.fecha_actualizacion = new Date();
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: director });
  return true;
};

const remove = async (id) => {
  const collection = await Database(COLLECTION);
  await collection.deleteOne({ _id: new ObjectId(id) });
  return true;
};

export const directorService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
