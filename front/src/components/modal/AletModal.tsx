import styled from "styled-components";

const AletModal = () => {
  return (
    <AletModalStyled>
      <>
        <Wave className="wave -one" />
        <Wave className="wave -two" />
        <Wave className="wave -three" />
      </>
      <ModalTitle>알람 끄기</ModalTitle>
    </AletModalStyled>
  );
};

const AletModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--point-color);
  display: flex;
  justify-content: center;
  align-items: center;

  @keyframes waveAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .wave.-one {
    animation: waveAnimation 10000ms infinite linear;
    opacity: 0.8;
    background: #0af;
  }
  .wave.-two {
    animation: waveAnimation 13500ms infinite linear;
    opacity: 0.3;
    background: yellow;
  }

  .wave.-three {
    animation: waveAnimation 12000ms infinite linear;
    opacity: 0.5;
    background: #e8a;
  }
`;
const Wave = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  width: 200vw;
  height: 200vw;
  margin-left: -100vw;
  /* margin-top: -6vw; */
  border-radius: 40%;
`;

const ModalTitle = styled.button`
  font-size: 60px;
  font-weight: bold;
  height: 120px;
  z-index: 1;
  padding: 0 20px;
  border-radius: 10px;
`;

export default AletModal;
