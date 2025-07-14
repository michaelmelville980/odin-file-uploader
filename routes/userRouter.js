const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const userController = require("../controllers/userController");
const passport = require("passport");

// Creating Router
const userRouter = Router();

// Function To Verify User Is Authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
}

// Validation & Sanitization (Sign Up)
const validateSignUp = [
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

const validateFolderName = [
  body("folderName")
    .trim()
    .isLength({ max: 75 })
    .withMessage("Folder name must be at most 75 characters")
];

// Route (GET): Log In
userRouter.get("/", userController.renderLogIn);

// Route (GET): Sign Up
userRouter.get("/sign-up", userController.renderSignUp);

// Route (POST): Sign Up
userRouter.post("/sign-up", validateSignUp, userController.handleSignUp);

// Route (POST): Log In
userRouter.post(
  "/sign-in",
  passport.authenticate("local", {
    successRedirect: "/files",
    failureRedirect: "/",
    failureFlash: true,
  })
);

// Route (GET): Files
userRouter.get("/files", ensureAuthenticated, userController.renderFiles);

// Route (POST): Add Folder
userRouter.post("/new-folder", ensureAuthenticated, validateFolderName, userController.addFolder)



// userRouter.get("/", userController.renderMain);

// userRouter.get("/create", userController.renderItemForm);
// userRouter.post("/create", userController.addItem);

// userRouter.get("/edit/:id", userController.renderEditForm);
// userRouter.post("/edit/:id", userController.editItem);

// userRouter.post("/delete/:id", userController.deleteItem);

module.exports = userRouter;
