import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import TextBox from "../components/TextBox";
import backgroundImage from "../assets/2/로그인화면.png";
import backImage from "../assets/9/뒤로가기_아이콘.svg";
import per_0 from "../assets/9/편지보따리_0%.png";
import per_50 from "../assets/9/편지보따리_50%.png";
import per_100 from "../assets/9/편지보따리_100%.png";
import MemberProfile from "../components/MemberProfile";
import TextBox2 from "../components/TextBox2";
import QuizPopup from "../components/QuizPopup";
import AddQuiz from "../components/AddQuiz";

const GlobalStyle = createGlobalStyle`
  #group-page {
    ${({ isBlurred }) =>
      isBlurred &&
      `
      filter: blur(5px);
      transition: filter 0.3s ease-in-out;
    `}
  }
`;

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
`;

const ServiceName = styled.div`
  font-size: 48px;
  color: #ffffff;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const InviteCode = styled.div`
  font-weight: 400;
  font-size: 20px;
  color: #424242;
  text-decoration: underline;
  cursor: pointer;
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

const DDayBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 106px;
  height: 44px;
  background: rgba(150, 79, 76, 0.8);
  border-radius: 30px;
  font-weight: 400;
  font-size: 24px;
  color: #ffffff;
  margin: 0 20px;
`;

const Divider = styled.div`
  width: 1200px;
  height: 5px;
  background-color: rgba(150, 79, 76, 0.8);
  transform: rotate(180deg);
  margin: 10px 0;
`;

const TextBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const fetchGroupDetails = async (groupSeq) => {
  try {
    const response = await fetch(`/api/group/${groupSeq}/findDetails`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching group details:", error);
    return null;
  }
};

function Group({ groupSeq }) {
  const [members, setMembers] = useState([]);
  const [isQuizPopupVisible, setIsQuizPopupVisible] = useState(false);
  const [isAddQuizPopupVisible, setIsAddQuizPopupVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [dayAfterCnt, setDayAfterCnt] = useState(0);
  const [userName, setUserName] = useState("");
  const [usedQuestionSeq, setUsedQuestionSeq] = useState(null);
  const [memberSeq, setMemberSeq] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = () => {
      const name = localStorage.getItem("userName") || "홍길동";
      setUserName(name);
    };

    fetchUserName();

    const getGroupDetails = async () => {
      const data = await fetchGroupDetails(groupSeq);
      if (data && data.data) {
        setGroupName(data.data.groupName);
        setDayAfterCnt(data.data.dayAfterCnt);
        setPercentage(data.data.achievePercent);
        const formattedMembers = data.data.groupMemberList.map((member) => ({
          memberSeq: member.memberSeq,
          userName: member.userName,
          userBirth: member.userBirth,
          userPhone: member.userPhone,
          codeName: member.codeName,
          profileImage: member.profileImage || "",
        }));
        setMembers(formattedMembers);
      }
    };

    getGroupDetails();
  }, [groupSeq]);

  const handleQuizButtonClick = () => {
    setUsedQuestionSeq(3);
    setMemberSeq(1);
    setIsQuizPopupVisible(true);
  };
  const handleBackClick = () => {
    navigate(-1);
  };
  const handleCreateQuizButtonClick = () => {
    setIsAddQuizPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsQuizPopupVisible(false);
    setIsAddQuizPopupVisible(false);
  };

  const getIconByPercentage = (percentage) => {
    if (percentage === 100) return per_100;
    if (percentage === 50) return per_50;
    return per_0;
  };

  return (
    <>
      <GlobalStyle isBlurred={isQuizPopupVisible || isAddQuizPopupVisible} />
      <div id="group-page">
        <Container>
          <Navigation>
            <NavContainer>
              <BackBtn src={backImage} alt="뒤로가기" onClick={handleBackClick}/>
              <ServiceName>서비스 이름</ServiceName>
            </NavContainer>
          </Navigation>
          <HeaderContainer>
            <Header>
              <TitleContainer>
                <Title>{groupName}</Title>
                <DDayBadge>D + {dayAfterCnt}</DDayBadge>
              </TitleContainer>
              {groupSeq === 1 && <InviteCode>초대코드</InviteCode>}
            </Header>
            <Divider />
          </HeaderContainer>
          <TextBoxContainer>
            <TextBox
              header="편지 보따리"
              icon={getIconByPercentage(percentage)}
              text=""
              percentage={percentage}
              info={true}
            />
            <TextBox2
              members={members}
              onAnswerButtonClick={handleQuizButtonClick}
              onCreateQuizButtonClick={handleCreateQuizButtonClick}
            />
          </TextBoxContainer>
          <MemberProfile members={members} />
        </Container>
      </div>
      <QuizPopup
        isVisible={isQuizPopupVisible}
        onClose={handlePopupClose}
        usedQuestionSeq={usedQuestionSeq}
        memberSeq={memberSeq}
      />
      <AddQuiz
        isVisible={isAddQuizPopupVisible}
        onClose={handlePopupClose}
        memberSeq={6}
        userName={userName}
      />
    </>
  );
}

export default Group;