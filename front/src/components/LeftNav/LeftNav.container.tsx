import LeftNav from "./LeftNav";
import { useLocation } from "react-router-dom";

const LeftNavContainer = () => {
  const { pathname } = useLocation();

  // eslint-disable-next-line no-restricted-globals
  return <LeftNav pathname={pathname} />;
};

export default LeftNavContainer;
