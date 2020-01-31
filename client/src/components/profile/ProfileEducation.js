import React, { Fragment } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const ProfileEducation = ({ profile: { education } }) => {
  return (
    <Fragment>
      {education.length > 0 ? (
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          <Fragment>
            {education.map((education, idx) => {
              const {
                school,
                degree,
                fieldofstudy,
                current,
                to,
                from,
                description
              } = education;
              return (
                <div key={idx}>
                  <h3 className="text-dark">{school}</h3>
                  <p>
                    <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
                    {current ? (
                      " current"
                    ) : (
                      <Moment format="YYYY/MM/DD">{to}</Moment>
                    )}
                  </p>
                  <p>
                    <strong>Degree: </strong>
                    {degree}
                  </p>
                  <p>
                    <strong>Field of Study: </strong>
                    {fieldofstudy}
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
        <h4>No education listed...</h4>
      )}
    </Fragment>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileEducation;
