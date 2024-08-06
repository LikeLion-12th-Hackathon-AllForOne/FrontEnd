import styled from "styled-components";
import ngr from "../assets/Footer/남규리.svg";
import pjh from "../assets/Footer/박주형.svg";
import bgw from "../assets/Footer/변가원.svg";
import shy from "../assets/Footer/성호영.svg";
import ljq from "../assets/Footer/이정교.svg";
import jjw from "../assets/Footer/정지원.svg";

const PageContainer = styled.div`
  padding-bottom: 378px;
  box-sizing: border-box;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 372px;
  gap: 32px;
  position: absolute;
  width: 100%;
  height: 278px;
  left: 0px;
  bottom: 0px;
  background: #424242;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 1176px;
  height: 40px;
`;

const Title = styled.div`
  margin: 0 auto;
  width: 190px;
  height: 20px;
  font-weight: 400;
  font-size: 40px;
  line-height: 20px;
  color: #ffffff;
`;

const Divider = styled.div`
  width: 1176px;
  height: 0px;
  border: 5px solid #999999;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 32px;
  width: 1176px;
  height: 108px;
`;

const MemberRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 56px;
  width: 616px;
  height: 56px;
`;

const Member = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  isolation: isolate;
  width: 56px;
  height: 56px;
  position: relative;
`;

const MemberImage = styled.img`
  box-sizing: border-box;
  width: 56px;
  height: 56px;
`;

const MemberName = styled.div`
  position: absolute;
  width: 25px;
  height: 20px;
  left: calc(50% - 25px / 2 + 0.5px);
  top: calc(50% - 20px / 2);
  font-family: "Rakkas";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  color: #ffffff;
  z-index: 1;
`;

const TeamInfo = styled.div`
  width: 319px;
  height: 20px;
  font-weight: 400;
  font-size: 24px;
  line-height: 20px;
  color: #ffffff;
`;

const FooterComponent = () => (
  <PageContainer>
    <Footer>
      <FooterContainer>
        <Title>스토리마인드</Title>
      </FooterContainer>
      <Divider />
      <TeamContainer>
        <MemberRow>
          <MemberImage src={shy} />
          <MemberImage src={ngr} />
          <MemberImage src={pjh} />
          <MemberImage src={bgw} />
          <MemberImage src={ljq} />
          <MemberImage src={jjw} />
        </MemberRow>
        <TeamInfo>12th INU_LikeLion - Team. 올포원</TeamInfo>
      </TeamContainer>
    </Footer>
  </PageContainer>
);
export default FooterComponent;
