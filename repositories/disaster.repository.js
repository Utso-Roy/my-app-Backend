const { getDB } = require("../config/db");

// Get all disasters
const findAll = async () => {
  const db = getDB();

  return await db
    .collection("disasters")
    .find({})
    .toArray();
};

// Get single disaster by ID
const findById = async (id) => {
  const db = getDB();

  return await db
    .collection("disasters")
    .findOne({
      _id: id,
    });
};

// Create disaster
const create = async (disasterData) => {
  const db = getDB();

  const result = await db
    .collection("disasters")
    .insertOne(disasterData);

  return {
    _id: result.insertedId,
    ...disasterData,
  };
};

// Update disaster
const update = async (id, disasterData) => {
  const db = getDB();

  const result = await db
    .collection("disasters")
    .findOneAndUpdate(
      { _id: id },
      { $set: disasterData },
      { returnDocument: "after" }
    );

  return result;
};

// Delete disaster
const deleteDisaster = async (id) => {
  const db = getDB();

  const result = await db
    .collection("disasters")
    .deleteOne({
      _id: id,
    });

  return result.deletedCount > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteDisaster,
};