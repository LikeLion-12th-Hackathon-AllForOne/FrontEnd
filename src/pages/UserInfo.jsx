import React, { useState, useEffect } from "react";
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

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1200px;
  height: 900px;
  padding-left: 70px;
`;

const UserForm = styled.div`
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

const UserHeader = styled.div`
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

function UserInfo() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userBirth: "",
    userPhone: "",
    codeMbti: "",
  });
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await client.get("/api/user/searchUserInfo");
        if (response.data.status === "SUCCESS") {
          setUserInfo(response.data.data);
        } else {
          setMessage("사용자 정보를 불러오는 데 실패했습니다.");
          setIsError(true);
        }
      } catch (error) {
        console.error("사용자 정보 조회 오류", error);
        setMessage("사용자 정보를 불러오는 중 오류가 발생했습니다.");
        setIsError(true);
      }
    };

    fetchUserInfo();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleUpdateClick = async () => {
    if (!password || (showPasswordConfirm && password !== passwordConfirm)) {
      setMessage("비밀번호가 일치하지 않습니다.");
      setIsError(true);
      return;
    }

    try {
      const response = await client.post("/api/user/updateUserInfo", {
        id: userInfo.userId,
        pw: password,
      });
      if (response.data.code === 201) {
        navigate("/");
      } else {
        setMessage(response.data.msg);
        setIsError(true);
      }
    } catch (error) {
      console.error("정보 수정 오류", error);
      setMessage("정보 수정 중 오류가 발생했습니다.");
      setIsError(true);
    }
  };

  const handlePasswordClick = () => {
    setShowPasswordConfirm(true);
  };

  return (
    <Container>
      <BookContainer>
        <BackButton src={backButton} onClick={handleBackClick} />
        <UserContainer>
          <UserHeader>정보수정</UserHeader>
          <UserForm>
            <InputSet>
              <InputGroup>
                <Label>아이디</Label>
                <Input
                  value={userInfo.userId}
                  style={{ backgroundColor: "#D8C8BD" }}
                  disabled
                />
              </InputGroup>
              <InputGroup>
                <Label>비밀번호</Label>
                <Input
                  type="password"
                  placeholder="숫자, 영문으로 8~12자리로 입력해주세요."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onClick={handlePasswordClick}
                />
              </InputGroup>
              {showPasswordConfirm && (
                <InputGroup>
                  <Label>비밀번호 확인</Label>
                  <Input
                    type="password"
                    placeholder="비밀번호를 다시 한번 입력해주세요."
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </InputGroup>
              )}
              <InputGroup>
                <Label>이름</Label>
                <Input
                  value={userInfo.userName}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, userName: e.target.value })
                  }
                />
              </InputGroup>
              <InputGroup>
                <Label>생년월일</Label>
                <Input
                  value={userInfo.userBirth}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, userBirth: e.target.value })
                  }
                  placeholder="'20010101' 형식으로 입력해주세요."
                />
              </InputGroup>
              <InputGroup>
                <Label>전화번호</Label>
                <Input
                  value={userInfo.userPhone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, userPhone: e.target.value })
                  }
                  placeholder="'-'을 빼고 입력해주세요. ex) 01012341234"
                />
              </InputGroup>
              <InputGroup>
                <Label>MBTI</Label>
                <Input
                  value={userInfo.codeMbti}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, codeMbti: e.target.value })
                  }
                  placeholder="MBTI를 입력하면 좋은 일이 생길거에요."
                />
              </InputGroup>
            </InputSet>
            {message && <Message $isError={isError}>{message}</Message>}
            <ButtonGroup>
              <Button onClick={handleUpdateClick}>정보수정 완료</Button>
              <RegisterButton onClick={handleBackClick}>
                취소하기
              </RegisterButton>
            </ButtonGroup>
          </UserForm>
        </UserContainer>
      </BookContainer>
    </Container>
  );
}

export default UserInfo;
