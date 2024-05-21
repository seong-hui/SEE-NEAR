import LeftNav from "./LeftNav";
import { useLocation, useNavigate } from "react-router-dom";

const LeftNavContainer = () => {
  const { pathname } = useLocation();
  const navigator = useNavigate();
  const handleClick = (path: string) => {
    navigator(path);
  };

  return <LeftNav pathname={pathname} handleClick={handleClick} />;
};

export default LeftNavContainer;
