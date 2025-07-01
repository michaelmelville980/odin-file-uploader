const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const userController = require("../controllers/userController");

// Creating Router
const userRouter = Router();

// Validation & Sanitization
const validateItem = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 75 })
    .withMessage("Username must be at most 75 characters"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ max: 75 })
    .withMessage("Password must be at most 75 characters"),
];


// Routes
userRouter.get("/", userController.renderMain);

userRouter.get("/create", userController.renderItemForm);
userRouter.post("/create", userController.addItem);

userRouter.get("/edit/:id", userController.renderEditForm);
userRouter.post("/edit/:id", userController.editItem);

userRouter.post("/delete/:id", userController.deleteItem);

module.exports = userRouter;
