
const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const getUsersCollection = () => {
  return getDB().collection("users");
};

// Validate MongoDB ObjectId
const toObjectId = (id) => {
  if (
    typeof id !== "string" ||
    !ObjectId.isValid(id) ||
    new ObjectId(id).toHexString() !== id.toLowerCase()
  ) {
    const error = new Error("Invalid user ID");
    error.statusCode = 400;
    throw error;
  }

  return new ObjectId(id);
};

// GET all users
const findAll = async () => {
  return await getUsersCollection()
    .find({})
    .project({ password: 0 })
    .toArray();
};

// GET single user by ID
const findById = async (id) => {
  return await getUsersCollection().findOne(
    { _id: toObjectId(id) },
    { projection: { password: 0 } }
  );
};

// FIND user by email
const findByEmail = async (email) => {
  return await getUsersCollection().findOne(
    { email },
    { projection: { _id: 1, email: 1 } }
  );
};

// CREATE user
const create = async (userData) => {
  const result = await getUsersCollection().insertOne(userData);

  return await findById(result.insertedId.toHexString());
};

// UPDATE user
const update = async (id, updateData) => {
  const userId = toObjectId(id);

  const result = await getUsersCollection().updateOne(
    { _id: userId },
    { $set: updateData }
  );

  if (result.matchedCount === 0) {
    return null;
  }

  return await findById(id);
};

// DELETE user
const deleteUser = async (id) => {
  const result = await getUsersCollection().deleteOne({
    _id: toObjectId(id),
  });

  return result.deletedCount > 0;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  delete: deleteUser,
};
