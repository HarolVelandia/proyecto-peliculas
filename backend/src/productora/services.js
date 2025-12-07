import { Database } from "../database/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "productora";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: new ObjectId(id) });
};

const create = async (productora) => {
  const collection = await Database(COLLECTION);
  productora.estado = productora.estado || "Activo";
  productora.fecha_creacion = new Date();
  productora.fecha_actualizacion = new Date();
  let result = await collection.insertOne(productora);
  return result.insertedId;
};

const update = async (id, productora) => {
  const collection = await Database(COLLECTION);
  productora.fecha_actualizacion = new Date();
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: productora });
  return true;
};

const remove = async (id) => {
  const collection = await Database(COLLECTION);
  await collection.deleteOne({ _id: new ObjectId(id) });
  return true;
};

export const productoraService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
