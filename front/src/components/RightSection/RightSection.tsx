import styled from "styled-components";

const RightSection = () => {
  return <RightSectionLayout></RightSectionLayout>;
};

const RightSectionLayout = styled.div`
  min-width: 250px;
  height: 100%;
  background-color: #cddbed;
  padding: 50px 40px;
  border-left: 1px solid var(--light-grey-color);
  border-top-left-radius: 30px;
`;

export default RightSection;
