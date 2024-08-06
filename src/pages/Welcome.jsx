import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/1/시작화면.png";
import bookImage from "../assets/1/시작화면_책이미지.svg";
import startIcon from "../assets/1/알아보기_아이콘.svg";

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
  flex-direction: column;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 30px;
  position: absolute;
  top: 100px;
`;

const Text = styled.div`
  font-weight: 400;
  font-size: 32px;
  line-height: 52px;
  display: inline-block;
  text-align: center;
  color: #000000;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 18px 22px;
  background: #964f4c;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;

  &:after {
    content: "";
    display: inline-block;
    width: 24px;
    height: 24px;
    background-image: url(${startIcon});
    background-size: contain;
    background-repeat: no-repeat;
    margin-left: 8px;
  }
`;

const BookContainer = styled.div`
  position: absolute;
  width: 70%;
  height: 40%;
  bottom: 0;
  background-image: url(${bookImage});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
`;

const Question1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  padding-right: 10px;
`;

const Question2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  padding-left: 180px;
`;

const QuestionText = styled.p`
  line-height: 37px;
  text-align: center;
  color: #000000;
  border-bottom: 3px dashed #000000;
`;

const AnswerText = styled.p`
  line-height: 37px;
  text-align: center;
  color: #964f4c;
  border-bottom: 3px dashed #964f4c;
`;

const Welcome = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  };

  return (
    <Container>
      <TextBox>
        <Text>
          나에게 가장 소중한 <br />
          <span style={{ color: "#E27D60", fontWeight: "700" }}>
            가족, 친구, 연인
          </span>{" "}
          <br />
          당연히 알거라고 생각했던 <br />
          <span style={{ color: "#C38D9E", fontWeight: "700" }}>
            '그들의 이야기'
          </span>{" "}
          <br />
          과연 나는 제대로 알고 있었을까?
        </Text>
        <Button onClick={handleButtonClick}>알아보기</Button>
      </TextBox>
      <BookContainer>
        <QuestionContainer>
          <Question1>
            <QuestionText>Q. 엄마의 어렸을적 꿈은?</QuestionText>
            <AnswerText>A. 선생님</AnswerText>
          </Question1>
          <Question2>
            <QuestionText>Q. 아빠가 가장 좋아하는 음식은?</QuestionText>
            <AnswerText>A. 갈치조림</AnswerText>
          </Question2>
        </QuestionContainer>
      </BookContainer>
    </Container>
  );
};

export default Welcome;
