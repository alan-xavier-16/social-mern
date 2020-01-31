import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addComment } from "../../redux/posts/post.actions";

const CommentForm = ({ postId, addComment }) => {
  const [formData, setFormData] = useState({
    text: ""
  });

  const { text } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addComment(postId, formData);
    setFormData({ text: "" });
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>

      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a comment"
          value={text}
          onChange={handleChange}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addComment: (postId, formData) => addComment(postId, formData)
};

export default connect(null, mapDispatchToProps)(CommentForm);
