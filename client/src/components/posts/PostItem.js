import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";

import {
  addLike,
  removeLike,
  deletePost
} from "../../redux/posts/post.actions";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, like, comments, date },
  addLike,
  removeLike,
  deletePost
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to="/profile">
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        <button
          type="button"
          className="btn btn-light"
          onClick={e => addLike(_id)}
        >
          <i className="fas fa-thumbs-up"></i>{" "}
          {like.length > 0 && <span> {like.length}</span>}
        </button>

        <button
          type="button"
          className="btn btn-light"
          onClick={e => removeLike(_id)}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>

        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && (
            <span className="comment-count"> {comments.length}</span>
          )}
        </Link>

        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={e => deletePost(_id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  addLike: postId => addLike(postId),
  removeLike: postId => removeLike(postId),
  deletePost: postId => deletePost(postId)
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
