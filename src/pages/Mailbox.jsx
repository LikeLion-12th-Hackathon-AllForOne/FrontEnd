import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Quiz from "../components/Quiz";
import Footer from '../components/Footer';
import Logo from '../assets/logo.svg';
import backgroundImage from "../assets/2/로그인화면.png";
import backImage from "../assets/9/뒤로가기_아이콘.svg";
import infoIcon from "../assets/9/느낌표.svg";

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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const InfoText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 30px;
  line-height: 28px;
  color: #a9a7a5;
  margin-top: 16px;
`;

const InfoIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

function Mailbox() {
  return (
    <Container>
      {/* <Navigation>
        <NavContainer>
          <BackBtn src={backImage} alt="뒤로가기" />
          <LogoImg src={Logo} alt="Logo" />
        </NavContainer>
      </Navigation>
      <HeaderContainer>
        <Header>
          <TitleContainer>
            <Title>00님께 편지 쓰기</Title>
            <ReceiveMailbox
              header="편지 보따리"
              // icon={getIconByPercentage(percentage)}
              text=""
              // percentage={percentage}
              info={true}
            />
          </TitleContainer>
        </Header>
        <Divider />
      </HeaderContainer>
      <Main>
        <InfoText>
          <InfoIcon src={infoIcon} alt="Info Icon" />
            아직 나에게 온 편지가 없어요.
        </InfoText>
      </Main>
        
      {/* <Quiz /> */}
      <Footer /> */}
    </Container>
  );
}

export default Mailbox;
