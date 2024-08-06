import React from "react";
import styled from "styled-components";
import Letter1Icon from "../assets/mail/편지지 선택 아이콘 수정_1.svg";
import Letter2Icon from "../assets/mail/편지지 선택 아이콘 수정_2.svg";
import Letter3Icon from "../assets/mail/편지지 선택 아이콘 수정_3.svg";
import PlusLetter from "../assets/mail/편지지 추가 버튼(아이콘).svg";

const SelectLetterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  margin: 20px;
  width: 1200px;
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

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  padding: 16px 32px;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  border-top: 5px solid rgba(150, 79, 76, 0.8);
  border-radius: 0 0 16px 16px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  &::after{
    border: 1px solid #A86D69;  
  }
`;

const IconImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 0 10px;
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-block;

  &:hover .tooltiptext {
    visibility: visible;
  }
`;

const TooltipText = styled.div`
  visibility: hidden;
  width: 220px;
  background-color: #ffffff;
  color: black;
  text-align: center;
  border-radius: 5px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the tooltip above the text */
  left: 50%;
  margin-left: -110px;
  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  ${Tooltip}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

function SelectLetter({ header, onSelect }) {
  return (
    <SelectLetterContainer>
      <Header>
        {header}
      </Header>
      <Content>
        <IconContainer onClick={() => onSelect("Letter1")}>
          <IconImage src={Letter1Icon} alt="Letter 1" />
        </IconContainer>
        <IconContainer onClick={() => onSelect("Letter2")}>
          <IconImage src={Letter2Icon} alt="Letter 2" />
        </IconContainer>
        <IconContainer onClick={() => onSelect("Letter3")}>
          <IconImage src={Letter3Icon} alt="Letter 3" />
        </IconContainer>
        <Tooltip>
          <IconContainer>
            <IconImage src={PlusLetter} alt="Add Letter" />
          </IconContainer>
          <TooltipText>유료 편지지 기능은 정식 출시 이후에 공개 됩니다!</TooltipText>
        </Tooltip>
      </Content>
    </SelectLetterContainer>
  );
}

export default SelectLetter;
