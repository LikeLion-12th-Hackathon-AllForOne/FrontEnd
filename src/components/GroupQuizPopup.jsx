import React, { useState, useEffect } from "react";
import styled from "styled-components";
import client from "../lib/client";

const PopupContainer = styled.div`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 660px;
  background: #ffffff;
  border-radius: 30px;
  z-index: 1000;
`;

const PopupHeader = styled.div`
  font-family: "GangwonEduAll OTF";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  text-align: center;
  color: #964f4c;
  margin-bottom: 20px;
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  gap: 10px;
  width: 600px;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const QuestionText = styled.div`
  font-family: "GangwonEduAll OTF";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 26px;
  color: #000000;
  width: 570px;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 8px 18px;
  background: ${({ active }) => (active ? "#964f4c" : "#ffffff")};
  border: 2px solid #000000;
  border-bottom: ${({ active }) => (active ? "0" : "2px solid #000000")};
  border-radius: 20px 20px 0 0;
  font-family: "GangwonEduAll OTF";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: ${({ active }) => (active ? "#ffffff" : "#000000")};
  cursor: pointer;
`;

const AnswerBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 600px;
  height: 52px;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const AnswerInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  padding: 16px;
  font-family: "GangwonEduAll OTF";
  font-size: 16px;
  color: #999999;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 26px;
  margin-top: 20px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 10px;
  background: #964f4c;
  border: 2px solid #000000;
  border-radius: 12px;
  font-family: "GangwonEduAll OTF";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  color: #ffffff;
  cursor: pointer;
`;

const GroupQuizPopup = ({ isVisible, onClose, question, members }) => {
  const [activeTab, setActiveTab] = useState(members[0].name);
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    if (isVisible) {
      const fetchQuizDetails = async () => {
        try {
          const response = await client.get(
            `/api/question/today/question/${question.usedQuestionSeq}/answer/${question.memberSeq}`
          );
          setQuizData(response.data);
        } catch (error) {
          console.error("Error fetching quiz details:", error);
        }
      };

      fetchQuizDetails();
    }
  }, [isVisible, question]);

  return (
    <PopupContainer isVisible={isVisible}>
      <PopupHeader>오늘의 퀴즈</PopupHeader>
      <QuestionBox>
        <QuestionText>
          {quizData ? quizData.data.questionForm.question : ""}
        </QuestionText>
      </QuestionBox>
      <TabsContainer>
        {members.map((member) => (
          <Tab
            key={member.name}
            active={activeTab === member.name}
            onClick={() => setActiveTab(member.name)}
          >
            {member.name}
          </Tab>
        ))}
      </TabsContainer>
      <AnswerBox>
        <AnswerInput placeholder="답변을 입력해 주세요. (500자 이내)" />
      </AnswerBox>
      <ButtonsContainer>
        <Button onClick={onClose}>임시저장</Button>
        <Button onClick={onClose}>등록</Button>
      </ButtonsContainer>
    </PopupContainer>
  );
};

export default GroupQuizPopup;
