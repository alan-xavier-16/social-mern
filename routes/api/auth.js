const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const { jwtToken } = require("../../config/default");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

/* 
@route  GET api/auth
@desc   Test route
@access Public
*/
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/* 
@route  POST api/auth
@desc   Authenticate user & Get token
@access Public
*/
router.post(
  "/",
  [
    check("email", "Must be a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    /** Ensures user input is valid */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      /** Check if user exists */
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      /** Comparing Password */
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      /** Add JSON Web Token */
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        jwtToken,
        { expiresIn: 60 * 60 * 1000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server Error");
    }
  }
);

module.exports = router;
