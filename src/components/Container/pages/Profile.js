import React, {useState,useEffect} from "react";
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Profiles } from '../../../Actions/Auth';
import { PasswordReset } from "../../../Actions/Auth";
function Profile(props) {
  Profile.prototype = {
    Auth: PropTypes.object.isRequired,
    profiles: PropTypes.func.isRequired,
    PasswordReset:PropTypes.func.isRequired,
    
  };
  const { user } = props.Auth;

  useEffect(() => {
    props.Profiles()
  
  }, []);
  const [passRet, setPassRet] = useState({ old_password: '', new_password: '' });
  const onChange = (e) => {

    setPassRet({
        ...passRet,
       [e.target.name]: e.target.value,
    })
  }
    
  
  console.log(passRet)
  const onSubmit = (e) => {
    e.preventDefault();
    props.PasswordReset(passRet);
   window.location.reload()
  }
  const profile = props.profiles.data;
  const userdata = props.profiles.data.prouser
  console.log(userdata)
  return (
    <>
      <div className="text-center container col-md-6">
        <h3 className="mt-4">Profile Details</h3>
        <div className="col mb-4">
          <img
            src={`${process.env.REACT_APP_MY_BASEURL}`+profile.image}
            alt="avatar"
            className="avatarp"
          />
          <div className="card-body">
            <h5 className="card-title">Username: {user.username}</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <td>
                      <h2>Place of Study: {profile.university}</h2>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2>About: {profile.bio}</h2>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2>Interest: {profile.interest}</h2>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2>Email: {userdata.email}</h2>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>
                        <Link to="/prof">
                          {" "}
                          <i className="fa fa-user-edit" aria-hidden="true">
                            Edit Profile
                          </i>
                        </Link>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="container mt-2">
                        <div
                          id="accordianId"
                          role="tablist"
                          aria-multiselectable="true"
                        >
                          <div className="card">
                            <div
                              className="card-header"
                              role="tab"
                              id="section1HeaderId"
                            >
                              <h5 className="mb-0">
                                <a
                                  data-toggle="collapse"
                                  data-parent="#accordianId"
                                  href="#section1ContentId"
                                  aria-expanded="true"
                                  aria-controls="section1ContentId"
                                >
                                  Change Password
                                </a>
                              </h5>
                            </div>
                            <div
                              id="section1ContentId"
                              className="collapse in"
                              role="tabpanel"
                              aria-labelledby="section1HeaderId"
                            >
                              <div className="card-body">
                                <div>
                                  <form
                                    onSubmit={onSubmit}
                                    className="px-4 py-3"
                                  >
                                    <div className="form-group">
                                      <label htmlFor="exampleDropdownFormPassword1">
                                        Old Password
                                      </label>
                                      <input
                                        type="password"
                                        className="form-control"
                                        id="exampleDropdownFormPassword1"
                                        placeholder="Password"
                                        name="old_password"
                                        value={passRet.old_password}
                                        onChange={onChange}
                                        required
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="exampleDropdownFormPasswordn">
                                        New Password
                                      </label>
                                      <input
                                        type="password"
                                        className="form-control"
                                        id="exampleDropdownFormPasswordn"
                                        placeholder="New Password"
                                        name="new_password"
                                        value={passRet.new_password}
                                        onChange={onChange}
                                        required
                                      />
                                    </div>

                                    <button
                                      type="submit"
                                      className="btn btn-primary btn-block btn-rounded"
                                    >
                                      Submit
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  Auth: state.Auth,
  profiles:state.Auth.profiles,
})

export default connect(mapStateToProps, {Profiles,PasswordReset})(Profile);
