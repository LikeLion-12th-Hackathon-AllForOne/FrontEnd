import React from 'react';
import styled from 'styled-components';
import client from "../lib/client";
import xButton from '../assets/6/x.svg';

import BlueBird from '../assets/profile/BlueBird.png';
import GrayBird from '../assets/profile/GrayBird.png';
import GreenBird from '../assets/profile/GreenBird.png';
import PinkBird from '../assets/profile/PinkBird.png';
import RedBird from '../assets/profile/RedBird.png';
import YellowBird from '../assets/profile/YellowBird.png';

const PopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const PopupContent = styled.div`
    width: 500px;
    padding: 20px;
    border-radius: 10px;
    /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); */
    position: relative;
    animation: fadeIn 0.3s ease-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
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

const ProfileSelectionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
    justify-items: center;
`;

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
    border: ${props => props.selected ? '3px solid #964F4C' : 'none'};

    &:hover {
        border: 3px solid #964F4C;
    }
`;

const SelectProfilePopup = ({ onClose, onProfileSelect }) => {
    const profiles = [
        { id: 'blue', src: BlueBird },
        { id: 'gray', src: GrayBird },
        { id: 'green', src: GreenBird },
        { id: 'pink', src: PinkBird },
        { id: 'red', src: RedBird },
        { id: 'yellow', src: YellowBird }
    ];

    return (
        <PopupOverlay>
            <PopupContent>

                <ProfileSelectionGrid>
                    {profiles.map(profile => (
                        <ProfileImage
                            key={profile.id}
                            src={profile.src}
                            alt={profile.id}
                            onClick={() => onProfileSelect(profile.src)}
                        />
                    ))}
                </ProfileSelectionGrid>
            </PopupContent>
        </PopupOverlay>
    );
};

export default SelectProfilePopup;
