// FamilyGroupMember.jsx
import React, { useState } from 'react';
import client from "../lib/client";
import styled from 'styled-components';
import xButton from '../assets/6/x.svg';

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

const FamilySelectionSection = styled.div`
    width: 100%;
    margin-top:30px;
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

const Title = styled.div`
    border: 2px solid #000000;
    border-radius: 40px;
    font-size: 20px;
    font-weight: bold;
    padding: 10px 7px 7px 7px;
    margin-bottom: 10px;
`;

const SubMessage= styled.p`
    font-size:11px;
    color:red;
    font-weight:bold;
`

const FamliyBlock = styled.div`
    display:flex; 
    gap: 30px;
`

const FamilySelectOptionContainer = styled.div`
    position: relative;
    width: 200px;
    height: 50px;
    border-radius: 10px;
    border: 2px solid #000000;
    box-sizing: border-box;
    background: #fff;
    display:flex;
    cursor: pointer;
    overflow: visible;
`;

const FamilySelectOption = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding-top:5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;

    &:after {
        content: ${props => props.isOpen ? "'▲'" : "'▼'"};
        position: absolute;
        right: 10px;
        font-size: 16px;
        color: #964F4C;
    }
`;

const FamilySelectMenu = styled.ul`
    position: absolute;
    top: 87%;
    left: -2px;
    width: 102%;
    margin: 0;
    padding: 0;
    list-style: none;
    background: #fff;
    border: ${props => props.isOpen ? '2px solid #000000' : 'none'};
    border-top: none;
    border-radius: 0 0 10px 10px;
    max-height: ${props => props.isOpen ? '200px' : '0'};
    overflow-y: auto; 
    transition: max-height 0.3s ease-in-out;
    z-index: 1;

    &::-webkit-scrollbar {
        width: 0;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }
`;

const FamilySelectMenuItem = styled.li`
    padding: 10px;
    text-align: center;
    font-size: 16px;
    color: ${props => props.isSelected ? '#fff' : '#000'};
    background: ${props => props.isSelected ? '#964F4C' : 'transparent'};
    cursor: pointer;

    &:hover {
        background: #964F4C;
        color: #fff;
    }
`;

const NextButton = styled.button`
    width: 60px;
    height: 50px;
    padding-top: 7px;
    border-radius: 15px;
    background: #964F4C;

    color: #fff;
    font-size: 20px;
    border: 2px solid #000000;;
    cursor: pointer;

    &:hover {
        background: #8B5C5C;
    }
`;


const FamilyGroupMember = ({ onClose, groupSeq }) => {
    const [familyMember, setFamilyMember] = useState('');
    const [isFamilyMemberOpen, setIsFamilyMemberOpen] = useState(false);

    const handleFamilyMemberClick = () => {
        setIsFamilyMemberOpen(!isFamilyMemberOpen);
    };

    const handleFamilyMemberChange = (value) => {
        setFamilyMember(value);
        setIsFamilyMemberOpen(false);
    };

    const familyRoleToCodeSeq = {
        '아빠': 39,
        '엄마': 40,
        '아들': 41,
        '딸': 42
    };

    const handleNextClick = async () => {
        if (!familyMember) {
            alert("가족 관계를 선택해주세요.");
            return;
        }

        const codeCategoryRoleSeq = familyRoleToCodeSeq[familyMember];

        try {
            const response = await client.post("/api/group/updateRole", {
                groupSeq: groupSeq,
                codeCategoryRoleSeq: codeCategoryRoleSeq
            });
    
            if (response.data.status === "SUCCESS") {
                alert('가족 구성원이 등록되었습니다.');
                onClose();
            } else {
                console.error("서버 응답 오류", response.data.message);
            }
        } catch (error) {
            console.error("서버 오류", error);
        }
    };

    return (
        <PopupOverlay>
            <PopupContent>
                <CloseButton onClick={onClose}>
                    <img src={xButton} alt='xButton' />
                </CloseButton>

                <FamilySelectionSection>
                    <Title>가족 구성원 중 나는 누구인가요?</Title>
                    <SubMessage>한 번 선택하면 바꿀 수 없으니 잘 선택해주세요!</SubMessage>
                    
                    <FamliyBlock>
                        <FamilySelectOptionContainer>
                            <FamilySelectOption isOpen={isFamilyMemberOpen} onClick={handleFamilyMemberClick}>
                                {familyMember || "가족 관계"}
                            </FamilySelectOption>
                            <FamilySelectMenu isOpen={isFamilyMemberOpen}>
                                {["아빠", "엄마", "아들", "딸"].map(option => (
                                    <FamilySelectMenuItem
                                        key={option}
                                        isSelected={familyMember === option}
                                        onClick={() => handleFamilyMemberChange(option)}
                                    >
                                        {option}
                                    </FamilySelectMenuItem>
                                ))}
                            </FamilySelectMenu>
                        </FamilySelectOptionContainer>
                        <NextButton onClick={handleNextClick}>입장</NextButton>
                    </FamliyBlock>
                </FamilySelectionSection>
            </PopupContent>
        </PopupOverlay>
    );
};

export default FamilyGroupMember;

