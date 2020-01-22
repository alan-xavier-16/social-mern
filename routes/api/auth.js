const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
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
  (req, res, next) => {
    /** Ensures user input is valid */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      /** Passport Authentication */
      passport.authenticate("local", { session: false }, (error, user) => {
        if (error || !user) {
          return res.status(400).json({
            errors: [{ msg: "Invalid Credentials" }]
          });
        }

        req.login(user, { session: false }, error => {
          if (error) {
            return res.status(400).json({
              errors: [{ msg: "Server Error" }]
            });
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
        });
      })(req, res, next);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
