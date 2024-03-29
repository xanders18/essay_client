import styled from "styled-components";
import { color } from "../../../Constants/color"

export const ToursBox = styled.div`
  margin-top: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
`;

export const Tours = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Cards = styled.div`
  width: 15rem;
  height: 19rem;
  overflow: hidden;
  background: ${(props) =>
    `linear-gradient(${props.color.primary} 40%, ${props.color.secondary})`};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  transition: all 0.5s;
  border-radius: 4px;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 12px ${(props) => props.color.primary};
    cursor: pointer;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  img {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    border: 4px dashed ${(props) => props.color.secondary};
  }
`;

export const Text = styled.p`
  text-transform: capitalize;
  &:nth-child(2) {
    margin: 0;
    margin-top: 1rem;
    color: #b2b2b2;
  }

  &:nth-child(3) {
    font-size: 1.5rem;
    margin: 0;
  }
  &:nth-child(4) {
    color: ${color.primary};
  }
`;

export const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  color: white;

  * {
    margin: 0 !important;
  }
`;

export const InfoItem = styled.div`
  text-align: center;  
/* 
  p {
    margin: 4px 0 !important;
  }

  :nth-child(1) {
    width: 70%;
  }

  p:nth-child(2) {
    color: ${color.primary};
  } */
`;

