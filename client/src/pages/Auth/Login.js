import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //form function
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        //console.log(res);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate("/");
      } else {
        //console.log(res);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethinng went wrong");
    }
  };
  return (
    <Layout title="Login - Ecommerce App">
      <div className="form-container">
        <form onSubmit={handleSumbit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="form-group row">
            <label
              className="col-sm-3 col-form-label"
              htmlFor="exampleInputEmail"
            >
              Email:
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                placeholder="Enter Your Email"
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              className="col-sm-3 col-form-label"
              htmlFor="exampleInputPassword1"
            >
              Password:
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
