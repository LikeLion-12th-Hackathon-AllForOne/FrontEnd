import React, { useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import client from "../lib/client";
import QIcon from "../assets/9/편지보따리_안내멘트.svg";

const PopupContainer = styled.div`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-end;
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
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 600px;
  position: relative;
`;

const PopupTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 40px;
  color: #964f4c;
`;

const InfoIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 10px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 600px;
`;

const UserText = styled.div`
  width: 600px;
  height: 26px;
  font-weight: 600;
  font-size: 24px;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
`;

const QuestionBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  gap: 10px;
  width: 600px;
  height: 40px;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 12px;
`;

const QuestionInput = styled.input`
  font-family: "GangwonEdu Modu";
  width: 570px;
  height: 20px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #999999;
  border: none;
  outline: none;
`;

const SubmitButton = styled.div`
  display: flex;
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
  font-size: 25px;
  color: #ffffff;
`;

const Tooltip = styled.div`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: absolute;
  top: -130px;
  left: 140px;
  background: #ffbe98;
  border: 1px solid #000000;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  font-weight: 500;
  color: #333;
  width: 480px;
  z-index: 10;
`;

const AddQuiz = ({ isVisible, onClose, memberSeq, userName, info }) => {
  const [question, setQuestion] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleSubmit = async () => {
    try {
      await client.post("/api/question/add", {
        memberSeq,
        addQuestion: question,
      });
      onClose();
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return ReactDOM.createPortal(
    <PopupContainer isVisible={isVisible}>
      <PopupContent>
        <PopupHeader>
          <PopupTitle>퀴즈 만들기</PopupTitle>
          {info && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <InfoIcon src={QIcon} alt="info" />
              <Tooltip visible={tooltipVisible}>
                <strong>'편지 보따리'</strong>
                <br />
                <br />
                보낸 편지는 바로 확인할 수 없어요.
                <br />
                그룹원들이 쓴 편지가 일정 수 이상 모이면 보따리가 터지면서 그때
                확인할 수 있답니다!
                <br />
                몇 개의 편지가 쌓이면 보따리가 터질지는 아무도 몰라요. 적다면
                적고, 많다면 많을~
                <br />
                가까운 미래에 내가 썼던 그리고 내가 받은 편지를 보면서 과거에
                추억을 회상하게 해줘요!
                <br />
                편지를 쓰려면 쓰고 싶은 사람의 그룹 프로필 카드를 확인해보아요~!
              </Tooltip>
            </div>
          )}
        </PopupHeader>
        <UserText>{userName} 이(가)</UserText>
        <InputBox>
          <QuestionBox>
            <QuestionInput
              placeholder="질문 내용을 입력해주세요."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </QuestionBox>
          <SubmitButton onClick={handleSubmit}>
            <SubmitButtonText>생성</SubmitButtonText>
          </SubmitButton>
        </InputBox>
      </PopupContent>
    </PopupContainer>,
    document.getElementById("popup-root")
  );
};

export default AddQuiz;
