import styled from 'styled-components';

export const ErrorImageOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  border-top: 0.5px solid silver;
`;

export const ErrorImageContainer = styled.div`
  display: inline-block;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 200px;
`;

export const ErrorImageText = styled.h2`
  font-size: 20px;
  color: navey;
  padding: 10px;
  text-align: center;
`;
