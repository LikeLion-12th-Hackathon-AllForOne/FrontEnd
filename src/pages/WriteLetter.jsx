import React, { useState } from "react";
import styled from "styled-components";
import Footer from '../components/Footer';
import SelectLetter from "../components/SelectLetter";
import Logo from '../assets/logo.svg';
import backgroundImage from "../assets/2/로그인화면.png";
import backImage from '../assets/9/뒤로가기_아이콘.svg';
import Letter1 from "../assets/mail/1번 편지지.svg";
import Letter2 from "../assets/mail/2번 편지지.svg";
import Letter3 from "../assets/mail/3번 편지지.svg";
import ToLine from '../assets/mail/To. 적는칸선.svg';
import ContentLine from '../assets/mail/내용 적는칸선.svg';
import FromLine from '../assets/mail/From. 적는칸선.svg';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  width: 100vw;
  position: absolute;
  height: 116px;
  left: 0;
  top: 0;
  background: rgba(150, 79, 76, 0.8);
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
`;

const BackBtn = styled.img`
  width: 51px;
  height: 44px;
`;

const LogoImg = styled.img`
  width: 250px;
  height: 70px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  margin-top: 130px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: rgba(150, 79, 76, 0.8);
`;

const Divider = styled.div`
  width: 1200px;
  height: 5px;
  background-color: rgba(150, 79, 76, 0.8);
  transform: rotate(180deg);
  margin: 10px 0;
`;

const Main = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  /* background: rgba(255, 255, 255, 0.7); */
  /* border-radius: 0 0 16px 16px; */
  justify-content: center;
  min-height: 60vh;
  padding: 20px;
`;

const LetterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); 
  border-radius: 16px;
  background-color: #D8C8BD;
  width: 100%;
  min-height : 800px;
`;

const LetterPage = styled.div`
  position: relative;
  width: 400px;
  height: 600px;
  margin: 20px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
`;

const ToLineImage = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 360px;
`;

const ContentLines = styled.div`
  position: absolute;
  top: 80px;
  left: 20px;
  width: 360px;
  display: flex;
  flex-direction: column;
`;

const ContentLineImage = styled.img`
  width: 360px;
  height: 24px;
`;

const ContentInput = styled.textarea`
  position: absolute;
  top: 80px;
  left: 20px;
  width: 360px;
  height: calc(100% - 160px);
  border: none;
  background: transparent;
  font-size: 18px;
  line-height: 24px;
  resize: none;
  outline: none;
  overflow: hidden;
`;

const FromLineImage = styled.img`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 360px;
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 160px;
  height: 50px;
  margin: 0 30px;
  border: 1px solid #000;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.5); 
  background-color: ${(props) => (props.primary ? "#964F4C" : "#F2E8DA")};
  color: ${(props) => (props.primary ? "#F2E8DA" : "#964F4C")};
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;


`;

function WriteLetter() {
  const [selectedLetter, setSelectedLetter] = useState("Letter1");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSelectLetter = (letterType) => {
    setSelectedLetter(letterType);
  };

  const handleBackClick = () => {
    navigate("/group");
  };
  
  const handleContentChange = (e) => {
    const text = e.target.value;
    if (text.length <= 1000) {
      setContent(text);
    }
  };

  const getLetterImage = () => {
    switch (selectedLetter) {
      case "Letter1":
        return Letter1;
      case "Letter2":
        return Letter2;
      case "Letter3":
        return Letter3;
      default:
        return Letter1;
    }
  };

  const getContentLines = () => {
    const lines = content.split("\n");
    return (
      <ContentLines>
        {lines.map((line, index) => (
          <ContentLineImage key={index} src={ContentLine} />
        ))}
      </ContentLines>
    );
  };

  return (
    <Container>
      <Navigation>
        <NavContainer>
          <BackBtn src={backImage} alt="뒤로가기" onClick={handleBackClick} />
          <LogoImg src={Logo} alt="Logo" />
        </NavContainer>
      </Navigation>
      <HeaderContainer>
        <Header>
          <TitleContainer>
            <Title>00님께 편지 쓰기</Title>
          </TitleContainer>
        </Header>
        <Divider />
        <SelectLetter header="편지지 선택하기" onSelect={handleSelectLetter} />
      </HeaderContainer>
      <Main>
        <LetterContainer>
          {/* 편지 작성 부분 */}
        </LetterContainer>
        
      </Main>
      <ButtonContainer>
          <Button primary>전송하기</Button>
          <Button>취소하기</Button>
        </ButtonContainer>
      <Footer />
    </Container>
  );
}

export default WriteLetter;
