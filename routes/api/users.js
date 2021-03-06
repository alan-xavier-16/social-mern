const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const { jwtToken } = require("../../config/default");

const User = require("../../models/User");

/* 
@route  POST api/users
@desc   Register user
@access Public
*/
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Must be a valid email").isEmail(),
    check("password", "Must be 6 or more characters").isLength({ min: 6 })
  ],
  async (req, res) => {
    /** Ensures user input is valid */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      /** Check if user exists */
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      /** Create an instance of a user */
      user = new User({
        name,
        email,
        avatar,
        password
      });

      /** Encrypt Password and save user */
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

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
