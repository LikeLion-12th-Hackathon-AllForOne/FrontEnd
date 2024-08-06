import React, { useState } from 'react';
import styled from 'styled-components';
import client from "../lib/client";
import xButton from '../assets/6/x.svg';
import FamilyGroupMember from './FamilyGroupMemberPopup'; 

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const PopupContent = styled.div`
    background: #fff;
    width: 600px;
    height: 280px;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: fadeIn 0.3s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;

const CreateGroupSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;

    img {
        width: 20px;
        height: 20px;
    }
`;

const ToggleSwitchContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    position: relative;
    width: 200px;
    height: 45px;
    background: #fff;
    border: 2px solid #000000;
    border-radius: 40px;
    overflow: hidden;
`;

const ToggleButton = styled.button`
    background: none;
    height: 45px;
    color: ${props => props.$active ? '#fff' : '#8B5C5C'};
    border: none;
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    flex: 1;
    transition: background 0.01s, color 0.1s;
    z-index: 1;
`;

const Slider = styled.div`
    position: absolute;
    margin-top: 3px;
    left: ${props => props.$active ? 'calc(100% - 96px)' : '4px'};
    width: 92px;
    height: 35px;
    background: #8B5C5C;
    border-radius: 20px;
    transition: left 0.3s;
    z-index: 0;
`;

const ContentBlock = styled.div`
    width: 100%;
    height: 180px;
`;

const SelectionBlock = styled.div`
    width: 100%;
    height: 80px;
    padding: 15px;
    justify-content: center;
    display: flex;
    gap: 25px;
`;

const InputAndCreateBlock = styled.div`
    width: 100%;
    height: 80px;
    justify-content: center;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const SelectOptionContainer = styled.div`
    position: relative;
    width: 180px;
    height: 50px;
    border-radius: 10px;
    border: 2px solid #000000;
    box-sizing: border-box;
    background: #fff;
    cursor: pointer;
    overflow: visible;
`;

const SelectOption = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;

    &:after {
        content: ${props => props.$isOpen ? "'▲'" : "'▼'"};
        position: absolute;
        right: 10px;
        font-size: 16px;
        color: #964F4C;
    }
`;

const SelectMenu = styled.ul`
    position: absolute;
    top: 87%;
    left: -2px;
    width: 102%;
    margin: 0;
    padding: 0;
    list-style: none;
    background: #fff;
    border: ${props => props.$isOpen ? '2px solid #000000' : 'none'};
    border-top: none;
    border-radius: 0 0 10px 10px;
    max-height: ${props => props.$isOpen ? '200px' : '0'};
    overflow-y: auto; 
    transition: max-height 0.3s ease-in-out;
    z-index: 1;

    &::-webkit-scrollbar {
        width: 0;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }
`;

const SelectMenuItem = styled.li`
    padding: 10px;
    text-align: center;
    font-size: 16px;
    color: ${props => props.$isSelected ? '#fff' : '#000'};
    background: ${props => props.$isSelected ? '#964F4C' : 'transparent'};
    cursor: pointer;

    &:hover {
        background: #964F4C;
        color: #fff;
    }
`;

const GroupNameInput = styled.input`
    width: 300px;
    height: 50px;
    border-radius: 10px;
    padding: 13px 10px 10px 10px;
    align-items: center;
    border: 2px solid #999999;
    font-size: 16px;
    box-sizing: border-box;
`;

const CreateButton = styled.button`
    width: 75px;
    height: 50px;
    padding-top: 5px;
    border-radius: 10px;
    background: #964F4C;
    border: 2px solid #000000;
    color: #fff;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        background: #8B5C5C;
    }
`;

const InviteInputBlock = styled.div`
    width: 100%;
    height: 80px;
    justify-content: center;
    margin-top:30px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
`;
const InviteTitle = styled.h3`
    margin-top: 15px;
`;


const InviteCodeInput = styled.input`
    width: 300px;
    height: 50px;
    border-radius: 10px;
    padding: 13px 10px 10px 10px;
    align-items: center;
    border: 2px solid #999999;
    font-size: 18px;
    box-sizing: border-box;
`;


const CreateGroup = ({ onClose }) => {
    const [isCreatingRoom, setIsCreatingRoom] = useState(true);
    const [category, setCategory] = useState('');
    const [memberCount, setMemberCount] = useState('');
    const [groupName, setGroupName] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isMemberCountOpen, setIsMemberCountOpen] = useState(false);
    const [groupNamePlaceholder, setGroupNamePlaceholder] = useState('그룹 명을 입력해주세요. (2~8글자)');
    const [isFamilyPopupVisible, setIsFamilyPopupVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCategoryClick = () => {
        setIsCategoryOpen(!isCategoryOpen);
        setIsMemberCountOpen(false);
    };

    const handleMemberCountClick = () => {
        setIsMemberCountOpen(!isMemberCountOpen);
        setIsCategoryOpen(false);
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
        setIsCategoryOpen(false);
    };

    const handleMemberCountChange = (value) => {
        setMemberCount(value);
        setIsMemberCountOpen(false);
    };

    const categoryToCodeSeq = {
        '가족': 22,
        '친구': 23,
        '연인': 24
    };
    
    const handleCreateClick = async () => {
        if (!category || !memberCount || !groupName) {
            setErrorMessage("모든 필드를 채워주세요.");
            return;
        }
    
        const codeCategorySeq = categoryToCodeSeq[category];
        if (!codeCategorySeq) {
            setErrorMessage("유효하지 않은 카테고리입니다.");
            return;
        }
    
        try {
            // console.log(codeCategorySeq);
            // console.log(parseInt(memberCount));
            // console.log(groupName);
            const response = await client.post("/api/group/create", {
                codeCategorySeq: codeCategorySeq,
                groupMemberCnt: parseInt(memberCount),
                groupName: groupName
            });
    
            if (response.data.code === 201) {
                alert('방(그룹)이 생성되었습니다.');
                if (category === '가족') {
                    setIsFamilyPopupVisible(true);
                } else {
                    onClose(); 
                }
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error("서버 오류", error);
            setErrorMessage('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };

    const handleJoinClick = async () => {
        try {
            // 백엔드 연동 (요청 url : /api/group/join)
            const response = await client.post("/api/group/join", {
                groupInviteCode: inviteCode
            });

            if (response.data.status === "SUCCESS") {
                // 성공적으로 방에 입장
                alert('방에 성공적으로 입장했습니다.');
                onClose();
            } else {
                if (response.data.message === 'room_full') {
                    setErrorMessage('해당 방에 인원수가 가득 찼습니다.');
                } else if (response.data.message === 'invalid_code') {
                    setErrorMessage('존재하지 않는 코드입니다.');
                }
            }
        } catch (error) {
            setErrorMessage('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };

    return (
        <>
            <PopupOverlay>
                <PopupContent>
                    <CloseButton onClick={onClose}>
                        <img src={xButton} alt='xButton'/>
                    </CloseButton>
                    <CreateGroupSection>
                        <ToggleSwitchContainer>
                            <ToggleButton $active={!isCreatingRoom} onClick={() => setIsCreatingRoom(false)}>초대코드</ToggleButton>
                            <ToggleButton $active={isCreatingRoom} onClick={() => setIsCreatingRoom(true)}>방생성</ToggleButton>
                            <Slider $active={isCreatingRoom} />
                        </ToggleSwitchContainer>

                        {isCreatingRoom ? (
                            <ContentBlock>
                                <SelectionBlock>
                                    <SelectOptionContainer>
                                        <SelectOption $isOpen={isCategoryOpen} onClick={handleCategoryClick}>
                                            {category || "카테고리"}
                                        </SelectOption>
                                        <SelectMenu $isOpen={isCategoryOpen}>
                                            {["가족", "친구", "연인"].map(option => (
                                                <SelectMenuItem
                                                    key={option}
                                                    $isSelected={category === option}
                                                    onClick={() => handleCategoryChange(option)}
                                                >
                                                    {option}
                                                </SelectMenuItem>
                                            ))}
                                        </SelectMenu>
                                    </SelectOptionContainer>
                                    <SelectOptionContainer>
                                        <SelectOption $isOpen={isMemberCountOpen} onClick={handleMemberCountClick}>
                                            {memberCount || "인원수"}
                                        </SelectOption>
                                        <SelectMenu $isOpen={isMemberCountOpen}>
                                            {[2, 3, 4, 5, 6].map(i => (
                                                <SelectMenuItem
                                                    key={i}
                                                    $isSelected={memberCount === i.toString()}
                                                    onClick={() => handleMemberCountChange(i.toString())}
                                                >
                                                    {i}
                                                </SelectMenuItem>
                                            ))}
                                        </SelectMenu>
                                    </SelectOptionContainer>
                                </SelectionBlock>
                                <InputAndCreateBlock>
                                    <GroupNameInput
                                        type="text"
                                        placeholder={groupNamePlaceholder}
                                        value={groupName}
                                        onFocus={() => setGroupNamePlaceholder('')}
                                        onBlur={() => setGroupNamePlaceholder('그룹 명을 입력해주세요. (2~8글자)')}
                                        onChange={(e) => setGroupName(e.target.value)}
                                    />
                                    <CreateButton onClick={handleCreateClick}>생성</CreateButton>
                                </InputAndCreateBlock>
                                {errorMessage && <div style={{ color: 'red', marginLeft: "100px"}}>{errorMessage}</div>}
                            </ContentBlock>
                        ) : (
                            <ContentBlock>
                                <InviteInputBlock>
                                    <InviteTitle>초대 코드</InviteTitle>
                                    <InviteCodeInput
                                        type="text"
                                        placeholder="초대코드를 입력해주세요."
                                        value={inviteCode}
                                        onChange={(e) => setInviteCode(e.target.value)}
                                    />
                                    <CreateButton onClick={handleJoinClick}>입장</CreateButton>
                                </InviteInputBlock>
                                {errorMessage && <div style={{ color: 'red' , marginLeft: "100px"}}>{errorMessage}</div>}
                            </ContentBlock>
                        )}
                    </CreateGroupSection>
                </PopupContent>
            </PopupOverlay>
            {isFamilyPopupVisible && <FamilyGroupMember onClose={() => setIsFamilyPopupVisible(false)} />}
        </>
    );
};

export default CreateGroup;