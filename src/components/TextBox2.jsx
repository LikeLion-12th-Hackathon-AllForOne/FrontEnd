import React from "react";
import styled from "styled-components";
import infoIcon from "../assets/9/느낌표.svg";

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  width: 537.5px;
  height: 172px;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.5));
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 16px;
  height: 52px;
  background: rgba(150, 79, 76, 0.8);
  border-radius: 16px 16px 0 0;
  font-size: 24px;
  line-height: 20px;
  color: #ffffff;
  position: relative;
`;

const HeaderText = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 20px;
  color: #ffffff;
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 32px 10px 32px;
  gap: 2px;
  width: 100%;
  height: 120px;
  background: rgba(255, 255, 255, 0.7);
  border-top: 5px solid rgba(150, 79, 76, 0.8);
  border-radius: 0 0 16px 16px;
`;

const InfoText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #a9a7a5;
  margin-top: 16px;
`;

const InfoIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 40px;
  margin-top: 16px;
`;

const QuestionText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 374.5px;
  height: 40px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
  background: #ffffff;
  border: 3px solid #85677b;
  border-radius: 12px;
  padding: 10px 16px;
`;

const AnswerButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 71px;
  height: 40px;
  background: rgba(150, 79, 76, 0.8);
  border: 2px solid #000000;
  border-radius: 12px;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 12px;
  gap: 24px;
  width: 100%;
  height: 20px;
  margin-top: 16px;
`;

const Link = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-decoration: underline;
  color: rgba(150, 79, 76, 0.8);
  cursor: pointer;
`;

const TextBox2 = ({
  members,
  onAnswerButtonClick,
  onCreateQuizButtonClick,
}) => {
  return (
    <QuizContainer>
      <Header>
        <HeaderText>오늘의 퀴즈</HeaderText>
      </Header>
      <Content>
        {members.length === 0 ? (
          <InfoText>
            <InfoIcon src={infoIcon} alt="Info Icon" />
            멤버가 다 들어오면 퀴즈가 시작돼요!
          </InfoText>
        ) : (
          <>
            <QuestionBox>
              <QuestionText>Q. '홍길동'이 가장 좋아하는 음식은?</QuestionText>
              <AnswerButton onClick={onAnswerButtonClick}>
                답변하기
              </AnswerButton>
            </QuestionBox>
            <LinkContainer>
              <Link onClick={onCreateQuizButtonClick}>퀴즈 직접 만들기</Link>
              <Link>지난 퀴즈 모음</Link>
            </LinkContainer>
          </>
        )}
      </Content>
    </QuizContainer>
  );
};

export default TextBox2;
