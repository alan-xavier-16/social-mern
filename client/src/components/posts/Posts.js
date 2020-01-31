import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";

import { getPosts } from "../../redux/posts/post.actions";

const Posts = ({ getPosts, post }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return <div>POSTS</div>;
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

const mapDispatchToProps = {
  getPosts: () => getPosts(0)
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
