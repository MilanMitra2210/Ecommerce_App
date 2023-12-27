import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  //form function
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/v1/auth/register',
        { name, email, password, phone, address }
      );
      if(res && res.data.success){
        toast.success(res.data && res.data.message);
        navigate('/login');
      }else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethinng went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommerce App">
      <div className="form-container">
        <form onSubmit={handleSumbit}>
        <h4 className="title">REGISTER FORM</h4>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="exampleInputName">
              Name:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                placeholder="Enter Your Name"
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="exampleInputEmail">
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
          <div className="form-group row">
            <label className="col-sm-3 col-form-label" htmlFor="exampleInputPhone">
              Phone No:
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputPhone"
                placeholder="Enter Your Phone Number"
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              className="col-sm-3 col-form-label"
              htmlFor="exampleInputAddress"
            >
              Address:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="exampleInputAddress"
                placeholder="Enter Your Address"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
