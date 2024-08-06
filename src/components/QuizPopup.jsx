import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import axios from "axios";

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

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px;
  gap: 8px;
  width: 600px;
`;

const PopupHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  width: 600px;
`;

const PopupTitle = styled.div`
  font-weight: 700;
  font-size: 40px;
  line-height: 20px;
  text-align: center;
  color: #964f4c;
`;

const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 600px;
  height: 106px;
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 15px;
  gap: 10px;
  width: 600px;
  height: 46px;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 12px;
`;

const QuestionText = styled.div`
  font-weight: 400;
  font-size: 24px;
  line-height: 26px;
  color: #000000;
  width: 570px;
  height: 26px;
`;

const AnswerBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 30px;
  width: 600px;
  height: 50px;
`;

const AnswerInput = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 10px;
  width: 490px;
  height: 50px;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
`;

const SubmitButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px 6px;
  gap: 10px;
  width: 80px;
  height: 50px;
  background: #964f4c;
  border: 2px solid #000000;
  border-radius: 12px;
  cursor: pointer;
`;

const SubmitButtonText = styled.div`
  font-weight: 400;
  font-size: 25px;
  line-height: 20px;
  color: #ffffff;
  width: 38px;
  height: 20px;
`;

const QuizPopup = ({ isVisible, onClose, usedQuestionSeq, memberSeq }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `/api/question/today/question/${usedQuestionSeq}/answer/${memberSeq}`
        );
        const data = response.data.data;
        setQuestion(data.questionForm.question);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    if (isVisible) {
      fetchQuestion();
    }
  }, [isVisible, usedQuestionSeq, memberSeq]);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/question/add", {
        memberSeq,
        addQuestion: question,
        answerContents: answer,
        answerTmpYn: 0, // 저장
      });
      onClose();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return ReactDOM.createPortal(
    <PopupContainer isVisible={isVisible}>
      <PopupContent>
        <PopupHeader>
          <PopupTitle>오늘의 퀴즈</PopupTitle>
        </PopupHeader>
        <PopupBody>
          <QuestionBox>
            <QuestionText>{question}</QuestionText>
          </QuestionBox>
          <AnswerBox>
            <AnswerInput
              placeholder="답변을 입력해 주세요."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <SubmitButton onClick={handleSubmit}>
              <SubmitButtonText>입력</SubmitButtonText>
            </SubmitButton>
          </AnswerBox>
        </PopupBody>
      </PopupContent>
    </PopupContainer>,
    document.getElementById("popup-root")
  );
};

export default QuizPopup;
