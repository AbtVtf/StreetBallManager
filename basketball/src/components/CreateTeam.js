import { useEffect, useState, useContext } from "react";
import { v1 as uuidv1 } from "uuid";
import GameContext from "./GameContext";
import Navbar from "./Navbar";
import lscache from "lscache";


const CreateTeam = () => {
  const [players, setPlayers] = useState();
  const [p1, setp1] = useState(null);
  const [p2, setp2] = useState(null);
  const [p3, setp3] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [teamCountry, setTeamCountry] = useState("");
  const { imageUploaded, pic, createTeam } = useContext(GameContext);

  useEffect(() => {
    fetch("http://localhost:8000/players/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPlayers(data);
      });
  }, []);

  return (
      <>
      <Navbar/>
    {lscache.get("isLogged") === "true" ? <div className="TeamBoxContainer">
      <div className="TeamInfo">
        <div className="AllCredentials">
          <label>Team Name:</label>
          <input
            type="text"
            required
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <label>Country:</label>
          <input
            type="text"
            required
            value={teamCountry}
            onChange={(e) => setTeamCountry(e.target.value)}
          />
        </div>

        <div className="TeamLogoUpdate">
          <label>
            Team Logo:
            <input type="file" name="" id="fileId" onChange={imageUploaded} />
          </label>
          <div className="TeamLogoFrame">
            {pic && (
              <img
                className="TeamLogo"
                src={`data:image/jpeg;base64,${pic}`}
                alt="logo"
              />
            )}
          </div>
        </div>

        <p>Selected Players:</p>
        <div className="TeamSelectedPlayers">
          <div className="TeamPlayersSelected" onClick={() => setp1()}>
            {p1 && p1.firstName} {p1 && p1.lastName}
          </div>
          <div className="TeamPlayersSelected" onClick={() => setp2()}>
            {p2 && p2.firstName} {p2 && p2.lastName}
          </div>
          <div className="TeamPlayersSelected" onClick={() => setp3()}>
            {p3 && p3.firstName} {p3 && p3.lastName}
          </div>
        </div>
        <div
          onClick={() => createTeam(teamName, teamCountry, p1, p2, p3)}
          className="TeamCreateButton"
        >
          Create Team
        </div>
      </div>

      <div className="TeamPlayerList">
        {players &&
          Object.entries(players).map(([id]) => {
            if (players[id].isInTeam === false) {
              return (
                <div
                  key={uuidv1()}
                  onClick={() => {
                    if (
                      p1 !== players[id] &&
                      p2 !== players[id] &&
                      p3 !== players[id]
                    ) {
                      if (p1 == null) {
                        setp1(players[id]);
                      } else if (p2 == null) {
                        setp2(players[id]);
                      } else if (p3 == null) {
                        setp3(players[id]);
                      }
                    }
                  }}
                >
                  <div className="TeamPlayerCard">
                    <p key={uuidv1()}>
                      {" "}
                      {players[id].firstName} <br /> {players[id].lastName}
                    </p>

                    <img
                      className="TeamPlayerImage"
                      src={`data:image/jpeg;base64,${players[id].image}`}
                      alt="player"
                      key={uuidv1()}
                    />
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>: <div className="TeamBoxContainer"> <p style={{fontSize:"5em"}}>Please Log In first</p></div>}
    </>
  );
};

export default CreateTeam;
