import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = [];

    // Frontend validation
    if (!name || !dateOfBirth || !gender || !email || !password) {
      newErrors.push("All fields are required.");
    }
    if (!validateEmail(email)) {
      newErrors.push("Invalid email format.");
    }
    if (password !== cpassword) {
      newErrors.push("Passwords do not match.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`http://localhost/Registrationphp/register.php`, {
        name,
        dateOfBirth,
        gender,
        email,
        password,
      });

      if (response.data.success) {
        window.location.href = "/home";
      } else if (Array.isArray(response.data.errors)) {
        setErrors(response.data.errors);
      } else {
        setErrors(["An unknown error occurred."]);
      }
    } catch (error) {
      setErrors(["Something went wrong, please try again."]);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="register-box">
        <div className="register-logo">
          <b>City</b>Clique
        </div>

        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>

            {errors.length > 0 && (
              <div className="alert alert-danger">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                  </div>
                </div>
              </div>
                {/* Email input */}
                <div className="form-group">
                  <label>Email</label>
                  <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <div className="input-group">
                  <input
                    type="date"
                    className="form-control"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-calendar"></i></span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Gender</label>
                <div className="input-group">
                  <select
                    className="form-control"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-venus-mars"></i></span>
                  </div>
                </div>
              </div>

              <div className="form-group position-relative">
                <label>Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="input-group-append" onClick={() => setShowPassword(!showPassword)}>
                    <span className="input-group-text">
                      {showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-group position-relative">
                <label>Retype Password</label>
                <div className="input-group">
                  <input
                    type={showCPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Retype password"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    required
                  />
                  <div className="input-group-append" onClick={() => setShowCPassword(!showCPassword)}>
                    <span className="input-group-text">
                      {showCPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="icheck-primary">
                  <input type="checkbox" id="agreeTerms" name="terms" required />
                  <label htmlFor="agreeTerms">
                    I agree to the <a href="#">terms</a>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </form>

            <Link to="/login" className="text-center">
              I already have an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
