import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

import { getCurrentProfile } from "../../redux/profile/profile.actions";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.name}</i>
      </p>

      {profile !== null ? (
        <Fragment>HAS</Fragment>
      ) : (
        <Fragment>
          <p>You have not set up a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create a Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

const mapDispatchToProps = {
  getCurrentProfile: () => getCurrentProfile()
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);