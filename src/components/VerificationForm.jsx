import React, { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const VerificationForm = () => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  function handleChange(index, event) {
    const newCode = [...code];
    newCode[index] = event.target.value;
    setCode(newCode);

    if (event.key === "Backspace" && !event.target.value) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.target.value) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const pastedCode = event.clipboardData.getData("Text").slice(0, 5);
    setCode(pastedCode.split(""));
    inputRefs.current[0]?.focus();
  }

  function handleSubmit(e) {
    const verification_code = code.join("");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "PHPSESSID=8a43b15b8f79a51b13bb309a52ff11cc");

    var urlencoded = new URLSearchParams();
    urlencoded.append("code", verification_code);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      "https://falconlite.com/v1/api/verify-email?verification_code=7EDE2",
      requestOptions
    )
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((result) => {
        result = JSON.parse(result);
        console.log("Result", result);
        if (result.code === 200) {
          navigate("/dashboard");
        }
        if (result.code === 400) {
          setError(result.data.message);
        }
      })
      .catch((error) => console.log("error", error));

    setIsLoading(true);
  }

  useEffect(() => {
    if (code.join("").length === 5) handleSubmit();
  }, [code]);

  return (
    <>
      <Form onSubmit={handleSubmit} onPaste={handlePaste}>
        <div className="form-wrapper">
          <div className="form-input">
            {code.map((char, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={char}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleChange(index, e)}
                ref={(input) => {
                  inputRefs.current[index] = input;
                }}
                NotValid={true}
              />
            ))}{" "}
          </div>
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1 }}
              style={{ width: "20px", height: "20px" }}
            >
              {/* Add a loader here */}
            </motion.div>
          ) : (
            <Button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Verify
            </Button>
          )}
        </div>
      </Form>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </>
  );
};

export default VerificationForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  .form-input {
    display: flex;
    gap: 20px;
    input {
      padding: 30px 20px;
      width: 40px;
      border: 3px solid ${(props) => (props.NotValid ? " #f91d08" : "#4e8dd1")};
      outline: none;
      background: none;
      border-radius: 4px;
      font-size: 36px;
      line-height: 26px;
    }
  }
  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 150px;
  }
`;

const Button = styled(motion.button)`
  padding: 10px 20px;
  background-color: #51b5e8;
  color: #211919;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  width: 100%;
  &:hover {
    background-color: #35a0c1;
  }
`;
