import React, { useEffect, useState, useCallback } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

import CreateGroup from "../components/CreateGroupPopup";
import SelectProfilePopup from "../components/SelectProfilePopup";
import client from "../lib/client";
import Footer from '../components/Footer';

import backgroundImage from "../assets/2/로그인화면.png";
import Logo from '../assets/logo.svg';
import BlueBirdProfile from '../assets/profile/BlueBird.png';
import PlusGroup from '../assets/4/PlusGroup.png';
import family from '../assets/4/room_family.png';
import couple from '../assets/4/room_couple.png';
import friend from '../assets/4/room_friend.png';
import Lfamily from '../assets/4/Lroom_family.png';
import Lcouple from '../assets/4/Lroom_couple.png';
import Lfriend from '../assets/4/Lroom_friend.png';

const GlobalStyle = createGlobalStyle`
    #main-page {
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
    background: #A78C7B;
`;

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 1200px;
`;

const ProfileImage = styled.div`
    width: 80px;
    height: 80px;
    cursor: pointer;
    border-radius: 50%;
    border: 5px solid #F2E8DA;
    background-color:#ffffff;
    margin:10px 0px 16px 100px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
`;

const UserInfo = styled.div`
    margin:0px 500px 10px 20px;
    display: flex;
    flex-direction: column; 
`;

const UserInfoBlock = styled.div`
    display: flex;
    gap: 20px;
`;

const UserName = styled.div`
    font-size: 25px;
    font-weight: bold;
    color: white;
    margin-bottom: 15px;
`;

const LogoutButton = styled.div`
    color: white;
    cursor: pointer;
`;

const UserInfoButton = styled.div`
    color: white;
    cursor: pointer;
`;

const LogoImg = styled.img`
    width: 250px;
    height: 70px;
`;

const SelectGroupSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-top: 130px;
    max-width: 800px; /* 최대 너비 */
    min-width: 600px; /* 최소 너비 */
    box-sizing: border-box;
`;

const SelectGroupTitle = styled.div`
    font-size: 30px;
    color: #964F4C;
    font-weight: bold;
    margin: 20px 0px 10px 20px;
`;

const SelectGroupBlock = styled.div`
    width: 100%;
    height: 550px;
    border-color: #964F4C;
    border-style: solid;
    border-width: 3px;
    overflow: hidden;
    border-radius: 25px; /* 모서리를 둥글게 설정 */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`;

const GroupBox = styled.div`
    width: 180px;
    height: 220px;
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    box-sizing: border-box;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
`;

const EmptyBox = styled.div`
    width: 180px;
    height: 220px;
    margin: 15px;
    background-color: ${props => props.bgColor || 'rgba(153, 153, 153, 0.6)' };
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    box-sizing: border-box;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
`;

const PlusBox = styled.div`
    width: 180px;
    height: 220px;
    margin: 15px;
    background-color: ${props => props.$bgColor || 'rgba(153, 153, 153, 0.6)' };
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed black;
    border-radius: 10px;
    cursor: pointer;
    box-sizing: border-box;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
`;

const PlusButtonImage = styled.img`
    width: 50px;
    height: 50px;
`;

const totalBoxes = 6; // totalBoxes 정의 추가
const categoryImages = { // categoryImages 정의 추가
    "가족": {
        leader: Lfamily,
        member: family
    },
    "연인": {
        leader: Lcouple,
        member: couple
    },
    "친구": {
        leader: Lfriend,
        member: friend
    }
};

function Main() {
    const [userInfo, setUserInfo] = useState({
        userId: "",
        userName: "",
        userBirth: "",
        userPhone: "",
        codeMbti: "",
    });
    const [profileImage, setProfileImage] = useState(BlueBirdProfile); // 기본 프로필 이미지
    const [groups, setGroups] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false); // 프로필 팝업 상태 추가
    const [message, setMessage] = useState(''); // 에러 메시지 상태 추가
    const [isError, setIsError] = useState(false); // 에러 상태 추가
    const navigate = useNavigate();

    const fetchUserInfo = async () => {
        try {
            const response = await client.get("/api/user/searchUserInfo");

            if (response.data.status === "SUCCESS") {
                setUserInfo(response.data.list); // 사용자 정보 상태 업데이트
                console.log(userInfo.userName);
                setProfileImage(response.data.data.userImg || BlueBirdProfile); // 프로필 이미지 상태 업데이트
            } else {
                setMessage("사용자 정보를 불러오는 데 실패했습니다.");
                setIsError(true);
            }
        } catch (error) {
            console.error("사용자 정보 조회 오류", error);
            setMessage("사용자 정보를 불러오는 중 오류가 발생했습니다.");
            setIsError(true);
        }
    };

    useEffect(() => {
        fetchUserInfo(); // 페이지 로드 시 사용자 정보 가져오기
    }, []);

    const fetchGroups = useCallback(async () => {
        try {
            const response = await client.get("/api/group/findList/joinGroup");
            if (response.data.status === "SUCCESS") {
                setGroups(response.data.data.list);
            } else {
                setMessage("그룹 정보를 불러오는 데 실패했습니다.");
                setIsError(true);
            }
        } catch (error) {
            console.error("그룹 정보 조회 오류", error);
            setMessage("그룹 정보를 불러오는 중 오류가 발생했습니다.");
            setIsError(true);
        }
    }, []);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    const handleGroupCreation = useCallback(() => {
        setIsPopupOpen(false);
        fetchGroups();
    }, [fetchGroups]);

    const handleProfileSelect = async (selectedImage) => {
        setProfileImage(selectedImage);
        setIsProfilePopupOpen(false);
        
        try {
            const response = await client.post("/api/user/updateProfileImage", {
                profileImage: selectedImage
            });

            if (response.data.status === "SUCCESS") {
                alert('프로필 이미지가 업데이트되었습니다.');
            } else {
                console.error("서버 응답 오류", response.data.message);
            }
        } catch (error) {
            console.error("서버 오류", error);
        }
    };

    const handleLogoutButtonClick = () => {
        navigate("/login");
    };

    const handleUserInfoButtonClick = () => {
        navigate("/userinfo");
    };

    const renderBoxes = () => {
        let boxes = [];
        groups.forEach((group) => {
            const image = group.ownerYn ? categoryImages[group.categoryName].leader : categoryImages[group.categoryName].member;
            boxes.push(<GroupBox key={group.id} image={image}></GroupBox>);
        });

        if (boxes.length > 5) {
            return boxes;
        } else {
            boxes.push(
                <PlusBox key="create" $bgColor="#FFFFFF" onClick={() => setIsPopupOpen(true)}>
                    <PlusButtonImage src={PlusGroup} alt="+" />
                </PlusBox>
            );

            for (let i = boxes.length; i < totalBoxes; i++) {
                boxes.push(<EmptyBox key={`empty-${i}`} $bgColor="rgba(153, 153, 153, 0.6)"></EmptyBox>);
            }
        }

        return boxes;
    };

    return (
        <>
            <div id="main-page">
                <Container>
                    <Navigation>
                        <NavContainer>
                            <ProfileImage onClick={() => setIsProfilePopupOpen(true)}>
                                <img src={profileImage} alt="profile" />
                            </ProfileImage>
                            <UserInfo>
                                <UserName>{userInfo.userName}이름?</UserName>
                                
                                <UserInfoBlock>
                                    <LogoutButton onClick={handleLogoutButtonClick}>로그아웃</LogoutButton>
                                    <UserInfoButton onClick={handleUserInfoButtonClick}>정보수정</UserInfoButton>
                                </UserInfoBlock>
                            </UserInfo>
                            <LogoImg src={Logo} alt="Logo" />
                        </NavContainer>
                    </Navigation>
                    <SelectGroupSection>
                        <SelectGroupTitle>그룹 선택</SelectGroupTitle>
                        <SelectGroupBlock> 
                            {renderBoxes()}
                        </SelectGroupBlock>
                    </SelectGroupSection>
                    {isPopupOpen && (
                        <CreateGroup onClose={handleGroupCreation} />
                    )}
                    {isProfilePopupOpen && (
                        <SelectProfilePopup 
                            onClose={() => setIsProfilePopupOpen(false)} 
                            onProfileSelect={handleProfileSelect} 
                        />
                    )}
                    <Footer />
                </Container>
            </div>
        </>
    )
}

export default Main;
