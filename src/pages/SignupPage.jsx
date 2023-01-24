import SignupForm from "../components/SignupForm";
import signUp from "../assets/sign-up.png";
import styled from "styled-components";

const SignupPage = () => {
  return (
    <Wrap>
      <div className="p-container">
        <div style={{ flex: "1.5" }}>
          <Wrapper>
            <div className="container">
              <div className="content">
                <div className="title">
                  <h1>Create an account</h1>
                  <p>
                    Register on our website with your correct email address and
                    information
                  </p>
                </div>
                <SignupForm />
              </div>
            </div>
          </Wrapper>
        </div>
        <div className="half" style={{ flex: "1" }}>
          <img src={signUp} alt="" />
        </div>
      </div>
    </Wrap>
  );
};

export default SignupPage;

const Wrap = styled.div`
  background-color: #cbf4ff;
  .p-container {
    display: flex;
    .half {
      background-color: #5ca3d6;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
      }
    }
  }
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 40px;
  .container {
    .title {
      margin-bottom: 60px;
    }
    .content {
    }
    .sign-up {
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        width: 60%;
        margin-bottom: 16px;
      }
      a {
        color: #51b5e8;
      }
      p {
        color: #211919;
      }
    }
  }
`;
