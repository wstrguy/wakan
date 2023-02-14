const express = require("express");
const router = express.Router();
const { userSignup, userLogin, userLogout } = require("../controller/user.controller");
const { validateRequest, schemas } = require("../validation/validate");

/* The above code is using the validateRequest function to validate the request body against the
signupSchema. */
router.post("/signup", validateRequest(schemas.signupSchema), userSignup);
router.post("/login", validateRequest(schemas.loginSchema), userLogin); 
router.get("/logout", userLogout);

module.exports = router;


