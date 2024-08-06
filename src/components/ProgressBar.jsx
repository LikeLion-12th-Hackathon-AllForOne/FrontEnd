import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 358px;
  height: 40px;
  padding: 5px;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 358px;
  height: 20px;
  padding: 0;
  position: relative;
`;

const BarBackground = styled.div`
  box-sizing: border-box;
  width: 370px;
  height: 20px;
  border: 3px solid #000000;
  border-radius: 25px;
  z-index: 0;
`;

const BarFill = styled.div`
  position: absolute;
  width: ${({ percentage }) => percentage}%;
  height: 12px;
  left: 1px;
  top: calc(50% - 12px / 2);
  background: rgba(150, 79, 76, 0.8);
  border-radius: 25px;
  z-index: 1;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 358px;
  height: 18px;
  padding: 0;
  gap: 0;
`;

const Label = styled.div`
  font-family: "GangwonEduPower";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #999999;
`;

const ProgressBar = ({ percentage }) => {
  return (
    <ProgressBarContainer>
      <BarContainer>
        <BarBackground />
        <BarFill percentage={percentage} />
      </BarContainer>
      <LabelContainer>
        <Label>0%</Label>
        <Label>50%</Label>
        <Label>100%</Label>
      </LabelContainer>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
