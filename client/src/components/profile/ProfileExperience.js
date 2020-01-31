import React, { Fragment } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const ProfileExperience = ({ profile: { experience } }) => {
  return (
    <Fragment>
      {experience.length > 0 ? (
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          <Fragment>
            {experience.map(experience => {
              const {
                company,
                title,
                location,
                current,
                to,
                from,
                description
              } = experience;
              const idx = experience._id;
              return (
                <div key={idx}>
                  <h3 className="text-dark">{company}</h3>
                  <p>
                    <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
                    {current ? (
                      " current"
                    ) : (
                      <Moment format="YYYY/MM/DD">{to}</Moment>
                    )}
                  </p>
                  <p>
                    <strong>Position: </strong>
                    {title}
                  </p>
                  <p>
                    <strong>Location: </strong>
                    {location}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {description}
                  </p>
                </div>
              );
            })}
          </Fragment>
        </div>
      ) : (
        <h4>No experience listed...</h4>
      )}
    </Fragment>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileExperience;
