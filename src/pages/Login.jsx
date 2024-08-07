// import React, { useState } from "react";
// import styled from "styled-components";
// import client from "../lib/client";
// import { useNavigate } from "react-router-dom";
// import backgroundImage from "../assets/2/로그인화면.png";
// import bookImage from "../assets/2/책이미지.svg";
// import backButton from "../assets/2/뒤로가기.svg";
// import FooterComponent from "../components/Footer";

// const Container = styled.div`
//   position: relative;
//   width: 100vw;
//   min-height: 100vh;
//   background-image: url(${backgroundImage});
//   background-size: cover;
//   background-position: center;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const BookContainer = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 1200px;
//   height: 900px;
//   background-image: url(${bookImage});
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;
//   margin: 60px 0;
// `;

// const BackButton = styled.img`
//   position: absolute;
//   top: 70px;
//   left: 130px;
//   width: 40px;
//   height: 40px;
//   cursor: pointer;
// `;

// const LoginContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 1200px;
//   height: 900px;
//   padding-left: 70px;
// `;

// const LoginForm = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 32px 48px;
//   gap: 20px;
//   width: 600px;
//   height: 900px;
//   padding-right: 100px;
// `;

// const LoginHeader = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-weight: 800;
//   font-size: 56px;
//   line-height: 20px;
//   color: #000000;
//   width: 600px;
// `;

// const InputSet = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 600px;
//   height: 136px;
//   margin-bottom: 30px;
// `;

// const InputGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   padding: 0 0 10px 0;
//   height: 88px;
// `;

// const Label = styled.div`
//   font-family: "GangwonEduPower";
//   font-weight: 400;
//   font-size: 15px;
//   line-height: 20px;
//   color: #000000;
//   padding: 10px 0;
// `;

// const Input = styled.input`
//   font-family: "GangwonEdu Modu";
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 14px;
//   gap: 10px;
//   width: 400px;
//   height: 38px;
//   border: 3px solid #964f4c;
//   border-radius: 10px;
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 20px;
//   color: rgba(0, 0, 0, 0.6);
// `;

// const Message = styled.div`
//   font-size: 14px;
//   line-height: 20px;
//   color: ${(props) => (props.$isError ? "#FF0000" : "#5AA55D")};
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   gap: 24px;
//   width: 416px;
//   margin-top: 20px;
// `;

// const Button = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 12px 16px;
//   height: 38px;
//   background: #964f4c;
//   border-radius: 10px;
//   color: #ffffff;
//   font-weight: 500;
//   font-size: 16px;
//   line-height: 20px;
//   border: none;
//   cursor: pointer;
// `;

// const RegisterButton = styled.div`
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 12px 16px;
//   gap: 4px;
//   height: 38px;
//   border: 3px solid #964f4c;
//   border-radius: 10px;
//   font-weight: 500;
//   font-size: 16px;
//   line-height: 20px;
//   color: #964f4c;
//   background: transparent;
//   cursor: pointer;
// `;

// const Login = () => {
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState("");
//   const [userPwd, setUserPwd] = useState("");
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   const handleButtonClick = () => {
//     navigate("/signup");
//   };

//   const handleLoginClick = async () => {
//     if (!userId || !userPwd) {
//       setMessage("아이디 또는 비밀번호를 입력하지 않으셨습니다.");
//       setIsError(true);
//       return;
//     }

//     try {
//       const response = await client.post("/api/login/sign", {
//         userId,
//         userPwd,
//       });
//       console.log(response.data)
//       if (response.data.status === "SUCCESS") {
//         setMessage("로그인 되었습니다.");
//         setIsError(false);
//         navigate("/main");
//       } else {
//         setMessage("아이디 또는 비밀번호가 잘못 입력되었습니다.");
//         setIsError(true);
//       }
//     } catch (error) {
//       console.error("로그인 오류", error);
//       if (error.response && error.response.status === 404) {
//         setMessage("존재하지 않는 ID입니다.");
//       } else {
//         setMessage("로그인 중 오류가 발생했습니다.");
//       }
//       setIsError(true);
//     }
//   };

//   return (
//     <Container>
//       <BookContainer>
//         <BackButton src={backButton} onClick={handleBackClick} />
//         <LoginContainer>
//           <LoginHeader>로그인</LoginHeader>
//           <LoginForm>
//             <InputSet>
//               <InputGroup>
//                 <Label>아이디</Label>
//                 <Input
//                   placeholder="아이디를 입력하세요."
//                   value={userId}
//                   onChange={(e) => setUserId(e.target.value)}
//                 />
//               </InputGroup>
//               <InputGroup>
//                 <Label>비밀번호</Label>
//                 <Input
//                   type="password"
//                   placeholder="비밀번호를 입력하세요."
//                   value={userPwd}
//                   onChange={(e) => setUserPwd(e.target.value)}
//                 />
//                 {message && <Message $isError={isError}>{message}</Message>}
//               </InputGroup>
//             </InputSet>
//             <ButtonGroup>
//               <Button onClick={handleLoginClick}>로그인</Button>
//               <RegisterButton onClick={handleButtonClick}>
//                 회원가입
//               </RegisterButton>
//             </ButtonGroup>
//           </LoginForm>
//         </LoginContainer>
//       </BookContainer>
//       <FooterComponent />
//     </Container>
//   );
// };

// export default Login;
import React, { useState } from "react";
import styled from "styled-components";
import client from "../lib/client";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/2/로그인화면.png";
import bookImage from "../assets/2/책이미지.svg";
import backButton from "../assets/2/뒤로가기.svg";
import FooterComponent from "../components/Footer";

const Container = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BookContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 900px;
  background-image: url(${bookImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 60px 0;
`;

const BackButton = styled.img`
  position: absolute;
  top: 70px;
  left: 130px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 900px;
  padding-left: 70px;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 48px;
  gap: 20px;
  width: 600px;
  height: 900px;
  padding-right: 100px;
`;

const LoginHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 56px;
  line-height: 20px;
  color: #000000;
  width: 600px;
`;

const InputSet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 136px;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 10px 0;
  height: 88px;
`;

const Label = styled.div`
  font-family: "GangwonEduPower";
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
  padding: 10px 0;
`;

const Input = styled.input`
  font-family: "GangwonEdu Modu";
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px;
  gap: 10px;
  width: 400px;
  height: 38px;
  border: 3px solid #964f4c;
  border-radius: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.6);
`;

const Message = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => (props.$isError ? "#FF0000" : "#5AA55D")};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 416px;
  margin-top: 20px;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  height: 38px;
  background: #964f4c;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  border: none;
  cursor: pointer;
`;

const RegisterButton = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 4px;
  height: 38px;
  border: 3px solid #964f4c;
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #964f4c;
  background: transparent;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleButtonClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = async () => {
    if (!userId || !userPwd) {
      setMessage("아이디 또는 비밀번호를 입력하지 않으셨습니다.");
      setIsError(true);
      return;
    }

    try {
      const response = await client.post("/api/login/sign", {
        userId,
        userPwd,
      });
      if (response.data.status === "SUCCESS") {
        const token = response.data.data.accessToken; // 서버에서 토큰을 받아옵니다.
        localStorage.setItem("token", token); // 로컬 스토리지에 토큰을 저장합니다.
        setMessage("로그인 되었습니다.");
        setIsError(false);
        navigate("/main");
      } else {
        setMessage("아이디 또는 비밀번호가 잘못 입력되었습니다.");
        setIsError(true);
      }
    } catch (error) {
      console.error("로그인 오류", error);
      if (error.response && error.response.status === 404) {
        setMessage("존재하지 않는 ID입니다.");
      } else {
        setMessage("로그인 중 오류가 발생했습니다.");
      }
      setIsError(true);
    }
  };

  return (
    <Container>
      <BookContainer>
        <BackButton src={backButton} onClick={handleBackClick} />
        <LoginContainer>
          <LoginHeader>로그인</LoginHeader>
          <LoginForm>
            <InputSet>
              <InputGroup>
                <Label>아이디</Label>
                <Input
                  placeholder="아이디를 입력하세요."
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <Label>비밀번호</Label>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  value={userPwd}
                  onChange={(e) => setUserPwd(e.target.value)}
                />
                {message && <Message $isError={isError}>{message}</Message>}
              </InputGroup>
            </InputSet>
            <ButtonGroup>
              <Button onClick={handleLoginClick}>로그인</Button>
              <RegisterButton onClick={handleButtonClick}>
                회원가입
              </RegisterButton>
            </ButtonGroup>
          </LoginForm>
        </LoginContainer>
      </BookContainer>
      <FooterComponent />
    </Container>
  );
};

export default Login;
