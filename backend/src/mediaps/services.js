import { Database } from "../database/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "media";

// 🔹 Función para hacer los lookups (evitamos repetir código)
const buildLookups = () => [
  {
    $lookup: {
      from: "genero",
      localField: "generoId",
      foreignField: "_id",
      as: "genero",
    },
  },
  { $unwind: { path: "$genero", preserveNullAndEmptyArrays: true } },

  {
    $lookup: {
      from: "director",
      localField: "directorId",
      foreignField: "_id",
      as: "director",
    },
  },
  { $unwind: { path: "$director", preserveNullAndEmptyArrays: true } },

  {
    $lookup: {
      from: "productora",
      localField: "productoraId",
      foreignField: "_id",
      as: "productora",
    },
  },
  { $unwind: { path: "$productora", preserveNullAndEmptyArrays: true } },

  {
    $lookup: {
      from: "tipo",
      localField: "tipoId",
      foreignField: "_id",
      as: "tipo",
    },
  },
  { $unwind: { path: "$tipo", preserveNullAndEmptyArrays: true } },
];

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.aggregate(buildLookups()).toArray();
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error("ID inválido");

  const collection = await Database(COLLECTION);
  const result = await collection
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      ...buildLookups(),
    ])
    .toArray();

  return result[0] || null;
};

const create = async (media) => {
  const collection = await Database(COLLECTION);

  // Campos automáticos
  media.fecha_creacion = new Date();
  media.fecha_actualizacion = new Date();

  // Validar referencias
  if (media.generoId) media.generoId = new ObjectId(media.generoId);
  if (media.directorId) media.directorId = new ObjectId(media.directorId);
  if (media.productoraId) media.productoraId = new ObjectId(media.productoraId);
  if (media.tipoId) media.tipoId = new ObjectId(media.tipoId);

  let result = await collection.insertOne(media);
  return result.insertedId;
};

const update = async (id, media) => {
  const collection = await Database(COLLECTION);

  media.fecha_actualizacion = new Date();

  if (media.generoId) media.generoId = new ObjectId(media.generoId);
  if (media.directorId) media.directorId = new ObjectId(media.directorId);
  if (media.productoraId) media.productoraId = new ObjectId(media.productoraId);
  if (media.tipoId) media.tipoId = new ObjectId(media.tipoId);

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: media });
  return true;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error("ID inválido");

  const collection = await Database(COLLECTION);
  await collection.deleteOne({ _id: new ObjectId(id) });
  return true;
};

export const mediaService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
