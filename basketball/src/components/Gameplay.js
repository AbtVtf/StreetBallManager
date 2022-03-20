import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { v1 as uuidv1 } from 'uuid'
import Navbar from './Navbar';
const Gameplay = () => {
    const [teams, setTeams] = useState();
    const [team1, setTeam1] = useState(null);
    const [team2, setTeam2] = useState(null);
    const [gameScore1, setGameScore1] = useState();
    const [gameScore2, setGameScore2] = useState();
    let history = useHistory();

    useEffect(() => {
        fetch('http://localhost:8000/teams/')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setTeams(data)
            })
    }, [])

    const updateWinner = (team) => {
        let winner = team
        winner.games++
        winner.wins++
        console.log(team)
        console.log("winner ", winner)

        fetch('http://localhost:8000/teams/' + team.id, {
            method: 'DELETE'
        })
        console.log("team deleted")


        setTimeout(() => {
            fetch('http://localhost:8000/teams', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(winner)
            })
            console.log("team updated")
        }, 100);

    }

    const updateLoser = (team) => {
        let winner = team
        winner.games++
        winner.loses++
        console.log(team)
        console.log("Loser ", winner)

        fetch('http://localhost:8000/teams/' + team.id, {
            method: 'DELETE'
        })
        console.log("team deleted")


        setTimeout(() => {
            fetch('http://localhost:8000/teams', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(winner)
            })
            console.log("team updated")
        }, 100);
    }


    const setWinner = () => {
        let random1 = Math.floor(Math.random() * 10) + 1;
        let random2 = Math.floor(Math.random() * 10) + 1;
        let gameResultLose = Math.floor(Math.random() * 100) + 50;
        let gameResultWin = Math.floor(Math.random() * 30) + gameResultLose;
        let score1 = ((team1.score[0] + team1.score[1] + team1.score[2]) * 3 + random1) / 4
        let score2 = ((team2.score[0] + team2.score[1] + team2.score[2]) * 3 + random2) / 4
        console.log(score1)
        console.log(score2)
        if (score1 > score2) {
            updateWinner(team1)

            setTimeout(() => {
                updateLoser(team2)
            }, 200);


            setGameScore1(gameResultWin)
            setGameScore2(gameResultLose)
        } else {

            updateWinner(team2)
            setTimeout(() => {
                updateLoser(team1)
            }, 200);


            setGameScore2(gameResultWin)
            setGameScore1(gameResultLose)

        }


    }

    return (
        <>
        <Navbar/>
        <div>
            <div className="GameplayContainer">
                <div className="ListPage">
                    <div className="ListContainer">
                        <p>Select Two Teams</p>
                        {teams && Object.entries(teams).map(([id]) => {
                            return (
                                <div className="PlayerBox" key={uuidv1()} onClick={() => {
                                    if (team1 !== teams[id] && team2 !== teams[id]) {
                                        if (team1 == null) {
                                            setTeam1(teams[id])
                                        }
                                        else if (team2 == null) {
                                            setTeam2(teams[id])
                                        }
                                    }
                                }}>
                                    <p className="GameplayTeamInfo" key={uuidv1()}>{teams[id].name} <br /> {teams[id].country}</p>
                                    <img src={`data:image/jpeg;base64,${teams[id].logo}`} alt='player' key={uuidv1()} className="GameplayTeamLogo" />
                                </div>
                            )
                        })}
                    </div>
                </div>


                <div className="GameplayBox" >
                    <div className="GameplayTeams">
                        <div className="GameplayPlayer" onClick={() => setTeam1()}>
                            <p>{team1 && team1.name} {team1 && team1.country}</p>
                        </div>
                        <div className="GameplayPlayer" onClick={() => setTeam1()}>
                            <p>{team2 && team2.name} {team2 && team2.country}</p>
                        </div>
                    </div>
                    <div className="GameplayButton" onClick={setWinner}>Play Game</div>
                    <div>
                        <p>SCORE <br /> {team1 && team1.name + ":"} {gameScore1} <br /> {team2 && team2.name + ":"} {gameScore2}</p>
                    </div>
                </div>



            </div>

            
        </div>
        </>
    );
}

export default Gameplay;