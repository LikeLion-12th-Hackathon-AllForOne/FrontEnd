import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import client from "../lib/client";
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
    width: 400px;
    padding: 20px;
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

`

const Title = styled.div`
    border: 2px solid #000000;
    border-radius: 40px;
    font-size: 20px;
    font-weight: bold;
    padding: 5px 7px 7px 7px;
    margin-bottom: 10px;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

const InviteCodeInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

const CopyButton = styled.button`
    margin-left: 10px;
    padding: 10px 20px;
    background: #964F4C;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: #8B5C5C;
    }
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

const CreateGroupPopup = ({ groupSeq, onClose }) => {
    const [inviteCode, setInviteCode] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInviteCode = async () => {
            try {
                const response = await client.get(`/api/group/${groupSeq}/selectList`);
                if (response.data.status === "SUCCESS") {
                    setInviteCode(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
            }
        };

        fetchInviteCode();
    }, [groupSeq]);

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteCode)
            .then(() => alert('초대 코드가 복사되었습니다.'))
            .catch(() => alert('복사 실패. 다시 시도해주세요.'));
    };

    return (
        <PopupOverlay>
            <PopupContent>
                <CloseButton onClick={onClose}>
                    <img src={xButton} alt='xButton' />
                </CloseButton>
                <FamilySelectionSection>
                    <Title>초대코드 조회</Title>
                    <InputWrapper>
                        <InviteCodeInput value={inviteCode} readOnly />
                        <CopyButton onClick={handleCopy}>복사</CopyButton>
                    </InputWrapper>
                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                </FamilySelectionSection>
            </PopupContent>
        </PopupOverlay>
    );
};

export default CreateGroupPopup;