import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";

const GameContext = React.createContext();

export const GameProvider = (props) => {
  const [pic, setPic] = useState("");
  let base64String = "";
  let history = useHistory();

  const imageUploaded = () => {
    let file = document.querySelector("input[type=file]")["files"][0];
    let reader = new FileReader();
    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setPic(base64String);
    };
    reader.readAsDataURL(file);
  };

  function goToPlayer(id) {
    history.push("/players/" + id);
  }

  const createPlayer = async (firstName, lastName, image) => {
    let id = uuidv1();
    let shooting = Math.floor(Math.random() * 10) + 1;
    let dribble = Math.floor(Math.random() * 10) + 1;
    let defense = Math.floor(Math.random() * 10) + 1;
    let score = (2 * shooting + 2 * defense + dribble) / 5;
    const player = {
      id: id,
      isInTeam: false,
      firstName,
      lastName,
      shooting,
      dribble,
      defense,
      score,
      image,
    };

    if (firstName !== "" && lastName !== "" && image !== "") {
      await fetch("http://localhost:8000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player),
      })
        .then(() => {
          setPic("");
          goToPlayer(id);
        })
        .catch((err) => {
          console.log("Error while creating player: ", err.data.message);
        });
    }
  };

  const playerSetTeam = async (pl1, pl2, pl3) => {
    let info1 = pl1;
    info1.isInTeam = true;
    let info2 = pl2;
    info2.isInTeam = true;
    let info3 = pl3;
    info3.isInTeam = true;

    await fetch("http://localhost:8000/players/" + pl1.id, {
      method: "DELETE",
    })
      .then(() => {
        fetch("http://localhost:8000/players", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info1),
        });
      })
      .catch((err) => {
        console.log("Error while creating player: ", err.data.message);
      });

    await fetch("http://localhost:8000/players/" + pl2.id, {
      method: "DELETE",
    })
      .then(() => {
        fetch("http://localhost:8000/players", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info2),
        });
      })
      .catch((err) => {
        console.log("Error while creating player: ", err.data.message);
      });

    await fetch("http://localhost:8000/players/" + pl3.id, {
      method: "DELETE",
    })
      .then(() => {
        fetch("http://localhost:8000/players", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(info3),
        });
      })
      .catch((err) => {
        console.log("Error while creating player: ", err.data.message);
      });
  };

  function goToTeam(id) {
    history.push("/teams/" + id);
  }

  const createTeam = (teamName, teamCountry, p1, p2, p3) => {
    let teamId = uuidv1();
    const team = {
      id: teamId,
      name: teamName,
      country: teamCountry,
      players: [p1.id, p2.id, p3.id],
      score: [p1.score, p2.score, p3.score],
      logo: pic,
      games: 0,
      wins: 0,
      loses: 0,
    };
    fetch("http://localhost:8000/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(team),
    });
    console.log("team added");
    playerSetTeam(p1, p2, p3);
    goToTeam(teamId);
  };

  return (
    <GameContext.Provider
      value={{ imageUploaded, pic, createPlayer, playerSetTeam, createTeam }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContext;