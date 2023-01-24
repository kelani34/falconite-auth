import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import VerificationForm from "../components/VerificationForm";
import signUp from "../assets/sign-up.png";

const VerificationPage = () => {
  return (
    <AnimatePresence>
      <Wrap>
        <div style={{ flex: "1.5" }}>
          <FormWrapper>
            <div className="title">
              <h1>Kindly enter Email verification code</h1>
              <p>
                To sign up, kindly enter the verification code sent to your
                email address
              </p>
            </div>
            <VerificationForm />
          </FormWrapper>
        </div>
        <div className="half" style={{ flex: "1" }}>
          <img src={signUp} alt="" />
        </div>
      </Wrap>
    </AnimatePresence>
  );
};

export default VerificationPage;

const FormWrapper = styled.div`
  /* width: 60%; */
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 150px;

  .form-text {
    width: 100%;
    h1 {
      font-family: "Inter";
      font-weight: 600;
      font-size: 32px;
      line-height: 48px;
      /* text-align: center; */
      letter-spacing: -0.03em;
      color: rgba(0, 0, 0, 0.87);
      /* margin-bottom: 24px; */
    }
    p {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      /* identical to box height, or 186% */

      letter-spacing: -0.007em;

      color: rgba(0, 0, 0, 0.87);
    }
  }
`;
const Wrap = styled.div`
  background-color: #cbf4ff;
  height: 100vh;
  display: flex;
  .half {
    background-color: #5ca3d6;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    img {
      width: 100%;
    }
  }
`;
