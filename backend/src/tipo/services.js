import { Database } from "../database/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "tipo";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: new ObjectId(id) });
};

const create = async (tipo) => {
  const collection = await Database(COLLECTION);
  tipo.fecha_creacion = new Date();
  tipo.fecha_actualizacion = new Date();
  let result = await collection.insertOne(tipo);
  return result.insertedId;
};

const update = async (id, tipo) => {
  const collection = await Database(COLLECTION);
  tipo.fecha_actualizacion = new Date();
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: tipo });
  return true;
};

const remove = async (id) => {
  const collection = await Database(COLLECTION);
  await collection.deleteOne({ _id: new ObjectId(id) });
  return true;
};

export const tipoService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
