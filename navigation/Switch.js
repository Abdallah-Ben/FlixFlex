import AuthStack from './AuthStack';
import Home from './Home';
const Switch = ({uuid}) => {
  if (uuid) {
    return <Home />;
  } else {
    return <AuthStack />;
  }
};

export default Switch;
