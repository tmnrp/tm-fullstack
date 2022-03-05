import { utilBSIsUserLoggedIn } from "../../../utils/browserStorage";

const Home = () => {
  utilBSIsUserLoggedIn();

  //
  return <div>Home</div>;
};

export default Home;
