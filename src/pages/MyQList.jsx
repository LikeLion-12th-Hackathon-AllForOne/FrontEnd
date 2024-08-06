import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/2/로그인화면.png";
import backImage from "../assets/9/뒤로가기_아이콘.svg";
import infoIcon from "../assets/9/느낌표.svg";
import QuizComponent from "../components/Quiz";
import { useParams } from "react-router-dom";
import client from "../lib/client";

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
  cursor: pointer;
`;

const ServiceName = styled.div`
  font-size: 48px;
  color: #ffffff;
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

const MyQList = () => {
  const navigate = useNavigate();
  const { memberSeq } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [memberName, setMemberName] = useState("");
  const handleBackClick = () => {
    navigate("/group");
  };
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await client.get(
          `/api/question/someone/${memberSeq}/questionList/20240801`,
          {
            data: {
              codeCategorySeq: 22,
              groupMemberCnt: 4,
              groupName: "가족",
            },
          }
        );
        setQuizzes(response.data.data);
        setMemberName(
          response.data.data[0]?.answerForm[0]?.memberAnswerName || "멤버"
        );
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [memberSeq]);

  return (
    <Container>
      <Navigation>
        <NavContainer>
          <BackBtn src={backImage} alt="뒤로가기" onClick={handleBackClick}/>
          <ServiceName>스토리마인드</ServiceName>
        </NavContainer>
      </Navigation>
      <HeaderContainer>
        <Header>
          <TitleContainer>
            <Title>{memberName}의 퀴즈 모음</Title>
          </TitleContainer>
        </Header>
        <Divider />
      </HeaderContainer>
      <Main>
        {quizzes.length === 0 ? (
          <InfoText>
            <InfoIcon src={infoIcon} alt="Info Icon" />
            멤버가 다 들어오면 퀴즈가 시작돼요!
          </InfoText>
        ) : (
          <QuizComponent quizzes={quizzes} />
        )}
      </Main>
    </Container>
  );
};

export default MyQList;