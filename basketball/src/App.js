import "./App.css";
import CreatePlayer from "./components/CreatePlayer";
import PlayerList from "./components/PlayersList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PlayerDetails from "./components/PlayerDetails";
import CreateTeam from "./components/CreateTeam";
import TeamsList from "./components/TeamsList";
import TeamsDetails from "./components/TeamsDetails";
import Gameplay from "./components/Gameplay";
import Homepage from "./components/Homepage";
import bck from "./Images/bck.jpg";
import { GameProvider } from "./components/GameContext";
import Login from "./components/Login";
function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: `url(${bck})`,
          width: "100%",
          height: "120vh",
        }}
      >
        <GameProvider>
          <div className="App">
            <Switch>
              <Route exact path={"/login"}>
                <Login />
              </Route>
            </Switch>

            <Switch>
              <Route exact path={"/"}>
                <Homepage />
              </Route>
            </Switch>
            <Switch>
              <Route exact path={"/create-player"}>
                <CreatePlayer />
              </Route>
            </Switch>
            <Switch>
              <Route exact path={"/players"}>
                <PlayerList />
              </Route>
            </Switch>
            <Switch>
              <Route exact path={"/players/:playerId"}>
                <PlayerDetails />
              </Route>
            </Switch>
            <Switch>
              <Route exact path={"/create-team"}>
                <CreateTeam />
              </Route>
            </Switch>
            <Switch>
              <Route exact path={"/teams"}>
                <TeamsList />
              </Route>
            </Switch>
            <Switch>
              <Route exact path={"/teams/:teamId"}>
                <TeamsDetails />
              </Route>
            </Switch>
            <Switch>
              <Route exact path={"/game"}>
                <Gameplay />
              </Route>
            </Switch>
          </div>
        </GameProvider>
      </div>
    </Router>
  );
}

export default App;
