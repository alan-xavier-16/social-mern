const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

/** Fetching User collection from MongoDB */
const User = mongoose.model("user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      let user = await User.findOne({ email });
      try {
        /** Comparing Password and checking email */
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        return done(null, user, { message: "Successfully logged in" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
