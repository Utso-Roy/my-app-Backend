
const userService = require("../services/user.service");

// GET all users
const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Get users error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

// GET single user
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Get user error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

// POST create user
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Create user error:", error.message);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Failed to create user"
          : error.message,
    });
  }
};

// PUT update user
const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update user error:", error.message);

    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Failed to update user"
          : error.message,
    });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
