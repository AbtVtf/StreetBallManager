import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import lscache from "lscache";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="NavbarBox">
        <Link to="/">
          <img className="LogoImage" src={logo} alt="logo" />
        </Link>
        <div className="NavbarButtonContainer">
          <Link to="/create-player" className="NavbarButtons">
            CREATE PLAYERS
          </Link>
        </div>
        <div className="NavbarButtonContainer">
          <Link to="/players" className="NavbarButtons">
            PLAYERS LIST
          </Link>
        </div>
        {lscache.get("isLogged") === "true" && (
          <div className="NavbarButtonContainer">
            <Link to="/game" className="NavbarButtons">
              GAME
            </Link>
          </div>
        )}
        <div className="NavbarButtonContainer">
          <Link to="/create-team" className="NavbarButtons">
            CREATE TEAM
          </Link>
        </div>
        <div className="NavbarButtonContainer">
          <Link to="/teams" className="NavbarButtons">
            TEAMS LIST
          </Link>
        </div>
        {lscache.get("isLogged") === "true" ? (
          <div className="NavbarButtonContainer">
            <Link
              to="/login"
              className="NavbarButtons"
              onClick={() => lscache.flush()}
            >
              LOGOUT
            </Link>
          </div>
        ) : (
          <div className="NavbarButtonContainer">
            <Link to="/login" className="NavbarButtons">
              LOGIN
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
