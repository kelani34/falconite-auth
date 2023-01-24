import React from "react";
import { useContext, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../shared";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

const SignupForm = () => {
  const [error, setError] = useState();
  const [data, setdata] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // myHeaders.append("Cookie", "PHPSESSID=8a43b15b8f79a51b13bb309a52ff11cc");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", name);
    urlencoded.append("email", email);
    urlencoded.append("phone", phone);
    urlencoded.append("password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://falconlite.com/v1/api/send-email", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.text();
      })
      .then((result) => {
        result = JSON.parse(result);
        console.log("Result", result);
        if (result.code === 200) {
          toast.success("good");
          navigate("/verify");
        }
        if (result.code === 400) {
          setError(result.data.message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Form onSubmit={handleSubmit} id="form">
      <div>
        <div className="form-input-box">
          <Label>Full Name:</Label>
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jeremiah"
          />
        </div>
        <div className="form-input-box">
          <Label>Email Address:</Label>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Fame@gmail.com"
          />
        </div>
        <div className="form-input-box">
          <Label>Phone Number:</Label>
          <Input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+2348103769079"
          />
        </div>
        <div className="form-input-box">
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="************"
          />
        </div>
        <div className="form-input-box remember-box">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <Label htmlFor="remember">
            <span>Remember Me: </span>
          </Label>
        </div>
        <div>
          <div className="sign-up">
            <Button type="submit" form="form">
              Signup
            </Button>
            <p>
              Already have an account? <a href="#">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SignupForm;

const Form = styled.form`
  /* padding: 16px; */
  width: 100%;

  input {
    padding: 16px;
    /* width: 40px; */
    border: 3px solid #33cfee;
    outline: none;
    background: none;
    border-radius: 8px;

    font-size: 24px;
    line-height: 26px;
  }
  .form-input-box {
    display: flex;
    flex-direction: column;
  }
  .remember-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* justify-content: center; */
    /* gap: 24px; */
    margin-bottom: 40px;
    input {
      margin-right: 16px;
    }
    label {
      margin-bottom: 0;
    }
  }
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
`;

const Button = styled.button`
  background-color: #51b5e8;
  color: #211919;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #35a0c1;
  }
`;
