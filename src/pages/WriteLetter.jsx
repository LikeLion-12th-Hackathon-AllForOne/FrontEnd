import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import SelectLetter from "../components/SelectLetter";
import Logo from "../assets/logo.svg";
import backgroundImage from "../assets/2/로그인화면.png";
import backImage from "../assets/9/뒤로가기_아이콘.svg";
import Letter3 from "../assets/mail/3번.svg";
import ContentLine from "../assets/mail/내용 적는칸선.svg";
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
  justify-content: center;
  min-height: 60vh;
  padding: 20px;
`;

const LetterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  background-color: #d8c8bd;
  width: 100%;
  min-height: 700px;
`;

const LetterPage = styled.div`
  position: relative;
  width: 400px;
  height: 600px;
  margin: 20px;
  background-image: url(${Letter3});
  background-size: cover;
  background-position: center;
`;

const ContentLines = styled.div`
  position: absolute;
  top: 70px;
  left: 20px;
  width: 360px;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

const ContentLineImage = styled.img`
  width: 360px;
  height: 24px;
`;

const ContentInput = styled.textarea`
  position: absolute;
  top: 60px;
  left: 20px;
  width: 360px;
  height: calc(100% - 140px);
  border: none;
  background: transparent;
  font-size: 15px;
  line-height: 24px;
  resize: none;
  outline: none;
  overflow: hidden;
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 50px;
  margin: 0 30px;
  border: 1px solid #000;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.5);
  background-color: ${(props) => (props.primary ? "#964F4C" : "#F2E8DA")};
  color: ${(props) => (props.primary ? "#F2E8DA" : "#964F4C")};
  border-radius: 10px;
  font-size: 24px;
  cursor: pointer;
`;

function WriteLetter() {
  const [contentLeft, setContentLeft] = useState("");
  const [contentRight, setContentRight] = useState("");
  const navigate = useNavigate();
  const maxLinesPerPage = 18;
  const lineHeight = 24;
  const maxCharsPerLine = 40;

  const handleBackClick = () => {
    navigate("/group");
  };

  const handleContentChangeLeft = (e) => {
    let text = e.target.value;
    const lines = text.split("\n");
    if (lines.length > maxLinesPerPage) {
      const leftText = lines.slice(0, maxLinesPerPage).join("\n");
      const rightText = lines
        .slice(maxLinesPerPage)
        .join("\n")
        .slice(0, maxLinesPerPage * maxCharsPerLine);
      setContentLeft(leftText);
      setContentRight(rightText);
    } else {
      setContentLeft(text);
    }
  };

  const handleContentChangeRight = (e) => {
    const text = e.target.value;
    if (text.split("\n").length <= maxLinesPerPage) {
      setContentRight(text);
    }
  };

  const getContentLines = (content) => {
    const lines = content.split("\n");
    return (
      <ContentLines>
        {lines.map((_, index) => (
          <ContentLineImage
            key={index}
            src={ContentLine}
            style={{ top: `${index * lineHeight}px` }}
          />
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
        <SelectLetter header="편지지 선택하기" />
      </HeaderContainer>
      <Main>
        <LetterContainer>
          <LetterPage>
            {getContentLines(contentLeft)}
            <ContentInput
              value={contentLeft}
              onChange={handleContentChangeLeft}
            />
          </LetterPage>
          <LetterPage>
            {getContentLines(contentRight)}
            <ContentInput
              value={contentRight}
              onChange={handleContentChangeRight}
            />
          </LetterPage>
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
