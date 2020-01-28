import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../redux/alerts/alert.actions";

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
      setFormData({ name: "", email: "", password: "", password2: "" });
    } else {
      console.log("Success");
      setFormData({ name: "", email: "", password: "", password2: "" });
    }
  };

  return (
    <div>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            minLength="6"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={handleChange}
            minLength="6"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Register" />
      </form>

      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setAlert: (msg, alertType) => setAlert(msg, alertType)
};

export default connect(null, mapDispatchToProps)(Register);
