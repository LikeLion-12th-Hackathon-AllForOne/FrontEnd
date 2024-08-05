import React, { useState } from "react";
import styled from "styled-components";
import left from "../assets/9/왼쪽_화살표.svg";
import right from "../assets/9/오른쪽_화살표.svg";
import profileImg from "../assets/9/그룹_기본_이미지.png";
import Mark from "../assets/9/방장마크.svg";
import { useNavigate } from "react-router-dom"; // 변경

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 40px 0;
  width: 1100px;
  height: 584px;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.5));
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  width: 132px;
  height: 52px;
  background: rgba(150, 79, 76, 0.8);
  border-radius: 16px 16px 0px 0px;
`;

const HeaderText = styled.div`
  width: 100px;
  height: 20px;
  font-weight: 400;
  font-size: 24px;
  line-height: 20px;
  color: #ffffff;
`;

const ProfileContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 56px 0px;
  gap: 48px;
  width: 1100px;
  height: 532px;
  background: rgba(193, 87, 87, 0.1);
  border-top: 5px solid rgba(150, 79, 76, 0.8);
  border-radius: 0px 0px 12px 12px;
`;

const Arrow = styled.img`
  cursor: pointer;
  width: 40px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 18px;
  gap: 10px;
  width: ${(props) => (props.isCurrent ? "320px" : "256px")};
  height: ${(props) => (props.isCurrent ? "420px" : "320px")};
  background: ${(props) => (props.isCurrent ? "#964F4C" : "#D8C8BD")};
  border: 3px solid #424242;
  border-radius: 24px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.55);
  transition: all 0.3s;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${(props) => (props.isCurrent ? "#fff" : "#333")};
`;

const Info = styled.div`
  font-size: 18px;
  color: ${(props) => (props.isCurrent ? "#fff" : "#333")};
`;

const Button = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 38px;
  width: 180px;
  height: 52px;
  background: #ffffff;
  border: 3px solid #424242;
  border-radius: 20px;
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  color: rgba(150, 79, 76, 0.8);
  margin-top: 10px;
  cursor: pointer;
`;

const MemberCount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  position: absolute;
  width: 80px;
  height: 44px;
  right: 24px;
  bottom: 24px;
  background: rgba(150, 79, 76, 0.8);
  border-radius: 32px;
  font-weight: 400;
  font-size: 24px;
  line-height: 20px;
  color: #ffffff;
`;

const PlaceholderCard = styled(ProfileCard)`
  background: #ede0dd;
`;

const ManagerMark = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
`;

const MemberProfileSlider = ({ members = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? members.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === members.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getLeftIndex = () =>
    currentIndex === 0 ? members.length - 1 : currentIndex - 1;
  const getRightIndex = () =>
    currentIndex === members.length - 1 ? 0 : currentIndex + 1;

  const handleQuizNavigation = (memberSeq) => {
    navigate(`/member/${memberSeq}/quizlist`);
  };

  return (
    <Container>
      <Header>
        <HeaderText>멤버 프로필</HeaderText>
      </Header>
      <ProfileContainer>
        <Arrow src={left} onClick={handlePrev} />
        {members.length > 1 ? (
          <ProfileCard>
            <ProfileImage
              src={members[getLeftIndex()].profileImage || profileImg}
              alt="Profile"
            />
            {members[getLeftIndex()].memberSeq === 1 && (
              <ManagerMark src={Mark} />
            )}
            <Name>{members[getLeftIndex()].userName}</Name>
            <Info>생일: {members[getLeftIndex()].userBirth}</Info>
            <Info>전화번호: {members[getLeftIndex()].userPhone}</Info>
            <Info>MBTI: {members[getLeftIndex()].codeName || "???"}</Info>
          </ProfileCard>
        ) : (
          <PlaceholderCard />
        )}
        <ProfileCard isCurrent={true}>
          <ProfileImage
            src={members[currentIndex]?.profileImage || profileImg}
            alt="Profile"
          />
          {members[currentIndex]?.memberSeq === 1 && <ManagerMark src={Mark} />}
          <Name isCurrent={true}>{members[currentIndex]?.userName}</Name>
          <Info isCurrent={true}>생일: {members[currentIndex]?.userBirth}</Info>
          <Info isCurrent={true}>
            전화번호: {members[currentIndex]?.userPhone}
          </Info>
          <Info isCurrent={true}>
            MBTI: {members[currentIndex]?.codeName || "???"}
          </Info>
          <Button
            onClick={() =>
              handleQuizNavigation(members[currentIndex]?.memberSeq)
            }
          >
            퀴즈 보러가기
          </Button>
        </ProfileCard>
        {members.length > 2 ? (
          <ProfileCard>
            <ProfileImage
              src={members[getRightIndex()].profileImage || profileImg}
              alt="Profile"
            />
            {members[getRightIndex()].memberSeq === 1 && (
              <ManagerMark src={Mark} />
            )}
            <Name>{members[getRightIndex()].userName}</Name>
            <Info>생일: {members[getRightIndex()].userBirth}</Info>
            <Info>전화번호: {members[getRightIndex()].userPhone}</Info>
            <Info>MBTI: {members[getRightIndex()].codeName || "???"}</Info>
          </ProfileCard>
        ) : (
          <PlaceholderCard />
        )}
        <Arrow src={right} right onClick={handleNext} />
      </ProfileContainer>
      <MemberCount>
        {members.length > 0 ? currentIndex + 1 : 0} / {members.length}
      </MemberCount>
    </Container>
  );
};

export default MemberProfileSlider;
