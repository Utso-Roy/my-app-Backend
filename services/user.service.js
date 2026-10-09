
const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcryptjs");

const allowedFields = [
  "name",
  "email",
  "age",
  "role",
  "phone",
];

// GET all users
const getAllUsers = async () => {
  return await userRepository.findAll();
};

// GET user by ID
const getUserById = async (id) => {
  return await userRepository.findById(id);
};

// CREATE user
const createUser = async (userData) => {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    const error = new Error(
      "Name, email and password are required"
    );
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 8) {
    const error = new Error(
      "Password must be at least 8 characters"
    );
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser =
    await userRepository.findByEmail(normalizedEmail);

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {};

  for (const field of allowedFields) {
    if (userData[field] !== undefined) {
      newUser[field] = userData[field];
    }
  }

  newUser.email = normalizedEmail;
  newUser.password = hashedPassword;
  newUser.createdAt = new Date();

  return await userRepository.create(newUser);
};

// UPDATE user
const updateUser = async (id, userData) => {
  const updateData = {};

  for (const field of allowedFields) {
    if (userData[field] !== undefined) {
      updateData[field] =
        field === "email"
          ? String(userData[field]).trim().toLowerCase()
          : userData[field];
    }
  }

  if (userData.password !== undefined) {
    if (
      typeof userData.password !== "string" ||
      userData.password.length < 8
    ) {
      const error = new Error(
        "Password must be at least 8 characters"
      );
      error.statusCode = 400;
      throw error;
    }

    updateData.password = await bcrypt.hash(
      userData.password,
      12
    );
  }

  if (updateData.email) {
    const existingUser =
      await userRepository.findByEmail(updateData.email);

    if (existingUser && existingUser._id.toString() !== id) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  return await userRepository.update(id, updateData);
};

// DELETE user
const deleteUser = async (id) => {
  return await userRepository.delete(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
