import React from "react";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import infoImage from "../assets/9/편지보따리_안내멘트.svg";

const QuizComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  margin: 20px;
  width: 537.5px;
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

const InfoIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Tooltip = styled.div`
  display: none;
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

  ${Header}:hover & {
    display: block;
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 2px;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  border-top: 5px solid rgba(150, 79, 76, 0.8);
  border-radius: 0 0 16px 16px;
`;

const IconText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 103px;
  height: 85px;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

const Text = styled.div`
  font-size: 28px;
  line-height: 28px;
  color: #a9a7a5;
`;

function TextBox({ header, icon, text, percentage, info }) {
  return (
    <QuizComponent>
      <Header>
        {header}
        {info && (
          <>
            <InfoIcon src={infoImage} alt="info" />
            <Tooltip>
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
          </>
        )}
      </Header>
      <Content>
        <IconText>
          <IconContainer>
            <Icon src={icon} alt="icon" />
          </IconContainer>
          <Text>{text}</Text>
          {percentage !== undefined && <ProgressBar percentage={percentage} />}
        </IconText>
      </Content>
    </QuizComponent>
  );
}

export default TextBox;
