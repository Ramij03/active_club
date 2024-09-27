import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Basic validation rules
  const validate = () => {
    const newErrors = [];
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.push("Valid email is required.");
    if (!password || password.length < 6) newErrors.push("Password must be at least 6 characters.");
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost/Registrationphp/login.php", {
        email,
        password,
      });

      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("user_id", response.data.user_id); 

        if (response.data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      } else if (Array.isArray(response.data.errors)) {
        setErrors(response.data.errors);
      } else {
        setErrors(["An unknown error occurred."]);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors(["Something went wrong, please try again."]);
    }
  };

  return (
    <div className="hold-transition login-page d-flex justify-content-center align-items-center vh-100">
      <div className="login-box">
        <div className="login-logo">
          <b>City</b>Clique
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Login to your account</p>
            {Array.isArray(errors) && errors.length > 0 && (
              <div className="alert alert-danger">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <form onSubmit={handleLogin}>
              {/* Email input */}
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="current-email" 
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              {/* Password input */}
              <div className="input-group mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password" 
                />
                <div className="input-group-append" onClick={() => setShowPassword(!showPassword)}>
                  <div className="input-group-text">
                    {showPassword ? <span className="fas fa-eye"></span> : <span className="fas fa-eye-slash"></span>}
                  </div>
                </div>
              </div>
              {/* Login Button */}
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <Link to="/register" className="text-center">
              Register a new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
