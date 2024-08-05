import React, { useState } from "react";
import styled from "styled-components";
import client from "../lib/client";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/2/로그인화면.png";
import bookImage from "../assets/2/책이미지.svg";
import backButton from "../assets/2/뒤로가기.svg";

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

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 900px;
  padding-left: 70px;
`;

const SignUpForm = styled.div`
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

const SignUpHeader = styled.div`
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
  height: 536px;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 10px 0;
  height: 88px;
`;

const InputCheckGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
  width: 400px;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  font-family: "GangwonEduPower";
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
  padding: 10px 0;
`;

const Star = styled.div`
  font-family: "GangwonEduPower";
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #f97272;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
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

const Button2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 12px;
  gap: 4px;
  height: 38px;
  background: #964f4c;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  border: none;
  cursor: pointer;
  width: 110px;
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

function SignUp() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [mbti, setMbti] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [birthdayMessage, setBirthdayMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    userId: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birthday: "",
    phone: "",
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCheckDuplicate = async () => {
    try {
      const response = await client.get("/api/user/checkIdDuplicate", {
        params: { userId: userId.trim() },
      });
      console.log("Response:", response.data);
      if (response.data.status === "ERROR") {
        setMessage("해당 아이디는 이미 사용 중입니다.");
        setIsError(true);
      } else if (response.data.status === "SUCCESS") {
        setMessage("해당 아이디는 사용 가능합니다.");
        setIsError(false);
      }
    } catch (error) {
      console.error("중복 검사 오류", error);
      if (error.response && error.response.status === 400) {
        setMessage("잘못된 요청입니다. 아이디 형식을 확인해주세요.");
      } else {
        setMessage("중복 검사 중 오류가 발생했습니다.");
      }
      setIsError(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordConfirm && e.target.value !== passwordConfirm) {
      setPasswordMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMessage("");
    }
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordMessage("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordMessage("");
    }
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
    if (!/^\d{8}$/.test(e.target.value)) {
      setBirthdayMessage("20010101 형식으로 입력해주세요.");
    } else {
      setBirthdayMessage("");
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (e.target.value.includes("-")) {
      setPhoneMessage("-를 빼고 형식에 맞추어서 입력해주세요.");
    } else {
      setPhoneMessage("");
    }
  };

  const handleRegister = async () => {
    const errors = {};
    if (!userId) errors.userId = "아이디를 입력해주세요.";
    if (!password) errors.password = "비밀번호를 입력해주세요.";
    if (!passwordConfirm)
      errors.passwordConfirm = "비밀번호 확인을 입력해주세요.";
    if (password !== passwordConfirm)
      errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    if (!name) errors.name = "이름을 입력해주세요.";
    if (!birthday) errors.birthday = "생년월일을 입력해주세요.";
    if (!phone) errors.phone = "전화번호를 입력해주세요.";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await client.post("/api/user/join", {
          userId: userId,
          userPwd: password,
          userName: name,
          userBirth: birthday,
          userPhone: phone,
          userImg: "",
          codeMbti: mbti || "6",
        });
        if (response.data.status === "SUCCESS") {
          setMessage("회원가입이 완료되었습니다.");
          setIsError(false);
          navigate("/login");
          console.log(response);
          console.log("회원가입 완");
        } else {
          setMessage(response.data.message);
          setIsError(true);
        }
      } catch (error) {
        console.error("회원가입 오류", error);
        setMessage("회원가입 중 오류가 발생했습니다.");
        setIsError(true);
      }
    }
  };

  return (
    <Container>
      <BookContainer>
        <BackButton src={backButton} onClick={handleBackClick} />
        <SignUpContainer>
          <SignUpHeader>회원가입</SignUpHeader>
          <SignUpForm>
            <InputSet>
              <InputGroup>
                <LabelContainer>
                  <Label>아이디</Label>
                  <Star> * </Star>
                </LabelContainer>
                <InputCheckGroup>
                  <Input
                    placeholder="아이디를 입력하세요."
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <Button2 onClick={handleCheckDuplicate}>중복검사</Button2>
                </InputCheckGroup>
                {formErrors.userId && (
                  <Message $isError={true}>{formErrors.userId}</Message>
                )}
              </InputGroup>
              <InputGroup>
                <LabelContainer>
                  <Label>비밀번호</Label>
                  <Star> * </Star>
                </LabelContainer>
                <Input
                  type="password"
                  placeholder="숫자, 영문으로 8~12자리로 입력해주세요."
                  value={password}
                  onChange={handlePasswordChange}
                />
                {formErrors.password && (
                  <Message $isError={true}>{formErrors.password}</Message>
                )}
              </InputGroup>
              <InputGroup>
                <LabelContainer>
                  <Label>비밀번호 확인</Label>
                  <Star> * </Star>
                </LabelContainer>
                <Input
                  type="password"
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                />
                {formErrors.passwordConfirm && (
                  <Message $isError={true}>
                    {formErrors.passwordConfirm}
                  </Message>
                )}
              </InputGroup>
              <InputGroup>
                <LabelContainer>
                  <Label>이름</Label>
                  <Star> * </Star>
                </LabelContainer>
                <Input
                  placeholder="이름을 입력해주세요."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && (
                  <Message $isError={true}>{formErrors.name}</Message>
                )}
              </InputGroup>
              <InputGroup>
                <LabelContainer>
                  <Label>생년월일</Label>
                  <Star> * </Star>
                </LabelContainer>
                <Input
                  placeholder="'20010101' 형식으로 입력해주세요."
                  value={birthday}
                  onChange={handleBirthdayChange}
                />
                {birthdayMessage && (
                  <Message $isError={true}>{birthdayMessage}</Message>
                )}
                {formErrors.birthday && (
                  <Message $isError={true}>{formErrors.birthday}</Message>
                )}
              </InputGroup>
              <InputGroup>
                <LabelContainer>
                  <Label>전화번호</Label>
                  <Star> * </Star>
                </LabelContainer>
                <Input
                  placeholder="'-'을 빼고 입력해주세요. ex) 01012341234"
                  value={phone}
                  onChange={handlePhoneChange}
                />
                {phoneMessage && (
                  <Message $isError={true}>{phoneMessage}</Message>
                )}
                {formErrors.phone && (
                  <Message $isError={true}>{formErrors.phone}</Message>
                )}
              </InputGroup>
              <InputGroup>
                <Label>MBTI</Label>
                <Input
                  placeholder="MBTI를 입력하면 좋은 일이 생길거에요."
                  value={mbti}
                  onChange={(e) => setMbti(e.target.value)}
                />
              </InputGroup>
            </InputSet>
            <ButtonGroup>
              <Button onClick={handleRegister}>회원가입 완료</Button>
              <RegisterButton onClick={handleBackClick}>
                회원가입 취소
              </RegisterButton>
            </ButtonGroup>
            {message && <Message $isError={isError}>{message}</Message>}
          </SignUpForm>
        </SignUpContainer>
      </BookContainer>
    </Container>
  );
}

export default SignUp;
