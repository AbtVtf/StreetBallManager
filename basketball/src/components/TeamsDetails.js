import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { v1 as uuidv1 } from 'uuid'
import Navbar from './Navbar';
import lscache from "lscache";

const TeamsDetails = () => {
    let { teamId } = useParams();
    const [teamsDetails, setTeamDetails] = useState([]);
    const [players, setPlayers] = useState();
    const [p1, setp1] = useState();
    const [p2, setp2] = useState();
    const [p3, setp3] = useState();

    useEffect(() => {
        fetch('http://localhost:8000/teams/' + teamId)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setTeamDetails(data);
                getPlayers(data)
            })
    }, [])


    const removePlayer = async (pl, index) => {
        let team = teamsDetails
        let selectedPlayer = pl
        selectedPlayer.isInTeam = false
        let array = teamsDetails.players;
        let filtered = array.filter(function (value) {
            return value !== pl.id;
        });
        team.players = filtered
        if (index === 1) {
            setp1()
        } else if (index === 2) {
            setp2()
        } else if (index === 3) {
            setp3()
        }
        await fetch('http://localhost:8000/teams/' + teamsDetails.id, {
            method: 'DELETE'
        })

        await fetch('http://localhost:8000/teams', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(team)
        })



        await fetch('http://localhost:8000/players/' + pl.id, {
            method: 'DELETE'
        })

        await fetch('http://localhost:8000/players', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedPlayer)
        })




    }

    const addPlayer = async (pl) => {
        let team = teamsDetails
        let selectedPlayer = pl
        selectedPlayer.isInTeam = true
        let array = teamsDetails.players;
        array.push(pl.id)
        team.players = array
        

        if (p1 === undefined) {
            setp1(pl)
        } else if (p2 === undefined) {
            setp2(pl)
        } else if (p3 === undefined) {
            setp3(pl)
        }


        await fetch('http://localhost:8000/teams/' + teamsDetails.id, {
            method: 'DELETE'
        })

        await fetch('http://localhost:8000/teams', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(team)
        })


        await fetch('http://localhost:8000/players/' + pl.id, {
            method: 'DELETE'
        })

        await fetch('http://localhost:8000/players', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedPlayer)
        })

    }

    const deleteTeam = async () => {
        await fetch('http://localhost:8000/teams/' + teamsDetails.id, {
            method: 'DELETE'
        })
        await removePlayer(p1, 1)
        await removePlayer(p2, 2)
        await removePlayer(p3, 3)
    }

    const getPlayers = async (info) => {

        await fetch('http://localhost:8000/players/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setPlayers(data)
                data.forEach((index) => {
                    if (index.id === info.players[0]) {
                        setp1(index)
                    } else if (index.id === info.players[1]) {
                        setp2(index)
                    } else if (index.id === info.players[2]) {
                        setp3(index)
                    }
                })
            })

    }



    return (
        <>
        <Navbar/>
        <div className="AllDetailsContainer">
            <div className="TeamDetailsContainer">
                <img src={`data:image/jpeg;base64,${teamsDetails.logo}`} alt='player' key={uuidv1()} className="TeamDetailsLogo" />

                <div>
                    <p className="TeamDetailsCred">{teamsDetails.name} <br />{teamsDetails.country} <br /></p>
                </div>

                <p>G/W/L {teamsDetails.games}/{teamsDetails.wins}/{teamsDetails.loses}</p>

                <div onClick={() => {

                    removePlayer(p1, 1)
                }}>
                    {p1 && p1.firstName} {p1 && p1.lastName}
                </div>
                <div onClick={() => {
                    removePlayer(p2, 2)
                }}>
                    {p2 && p2.firstName} {p2 && p2.lastName}
                </div>
                <div onClick={() => {

                    removePlayer(p3, 3)
                }}>
                    {p3 && p3.firstName} {p3 && p3.lastName}
                </div>
                <div className="PlayerDetailsButton">
                <Link to='/teams' className="DetailsButton" >Back to Teams</Link>

                </div>
                <div className="PlayerDetailsButton">
                {lscache.get("isLogged") === "true" && <Link to='/teams' className="DetailsButton" onClick={deleteTeam} >Delete Team</Link>}

                </div>

            </div>

            {lscache.get("isLogged") === "true" && <div className="TeamDetailsPlayers" >
                {players && Object.entries(players).map((index) => {
                    if (index[1].isInTeam === false) {
                        return (

                            <div key={uuidv1()}>
                                <div onClick={() => addPlayer(index[1])} key={uuidv1()} className="PlayerBox">
                                    <div className="ListNamesContainer">
                                        <p key={uuidv1()} className="ListFirstName">First: {index[1].firstName} </p>
                                        <p key={uuidv1()} className="ListLastName">Last: {index[1].lastName}</p>
                                    </div>
                                    <img src={`data:image/jpeg;base64,${index[1].image}`} alt='player' key={uuidv1()} className="PlayerListImage" />
                                </div>
                            </div>
                        )
                    }
                })}
            </div>}

        </div>
        </>
    );
}

export default TeamsDetails;


/* 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import { v1 as uuidv1 } from 'uuid'

const TeamsDetails = () => {
    let { teamId } = useParams();
    const [teamsDetails, setTeamDetails] = useState([]);
    const [players, setPlayers] = useState();
    const [p1, setp1] = useState();
    const [p2, setp2] = useState();
    const [p3, setp3] = useState();

    useEffect(() => {
        fetch('http://localhost:8000/teams/' + teamId)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setTeamDetails(data);
                getPlayers(data)
            })
    }, [])


    const removePlayer = async (pl, index) => {
        let team = teamsDetails
        let selectedPlayer = pl
        selectedPlayer.isInTeam = false
        let array = teamsDetails.players;
        let filtered = array.filter(function (value) {
            return value !== pl.id;
        });
        team.players = filtered
        if (index === 1) {
            setp1()
        } else if (index === 2) {
            setp2()
        } else if (index === 3) {
            setp3()
        }
        await fetch('http://localhost:8000/teams/' + teamsDetails.id, {
            method: 'DELETE'
        })
            .then(() => {
                fetch('http://localhost:8000/teams', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(team)
                })
            })

        await fetch('http://localhost:8000/players/' + pl.id, {
            method: 'DELETE'
        })
            .then(() => {
                fetch('http://localhost:8000/players', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(selectedPlayer)
                })
            })
    }

    const addPlayer = async (pl) => {
        let team = teamsDetails
        let selectedPlayer = pl
        selectedPlayer.isInTeam = true
        let array = teamsDetails.players;
        array.push(pl.id)
        team.players = array
        console.log(p1, p2,)

        if (p1 === undefined) {
            setp1(pl)
        } else if (p2 === undefined) {
            setp2(pl)
        } else if (p3 === undefined) {
            setp2(pl)
        }


        await fetch('http://localhost:8000/teams/' + teamsDetails.id, {
            method: 'DELETE'
        })
            .then(() => {
                fetch('http://localhost:8000/teams', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(team)
                })
            })
            .then(() => {
                fetch('http://localhost:8000/players/' + pl.id, {
                    method: 'DELETE'
                })
            })
            .then(()=>{
                fetch('http://localhost:8000/players', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(selectedPlayer)
                })
            })
    }

    const deleteTeam = async () => {
        await fetch('http://localhost:8000/teams/' + teamsDetails.id, {
            method: 'DELETE'
        })
        await removePlayer(p1, 1)
        await removePlayer(p2, 2)
        await removePlayer(p3, 3)
      
        
    }

    const getPlayers = async (info) => {

        await fetch('http://localhost:8000/players/')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setPlayers(data)
                data.forEach((index) => {
                    if (index.id === info.players[0]) {
                        setp1(index)
                    } else if (index.id === info.players[1]) {
                        setp2(index)
                    } else if (index.id === info.players[2]) {
                        setp3(index)
                    }
                })
            })

    }



    return (
        <div className="AllDetailsContainer">
            <div className="TeamDetailsContainer">
                <img src={`data:image/jpeg;base64,${teamsDetails.logo}`} alt='player' key={uuidv1()} className="TeamDetailsLogo" />

                <div>
                    <p className="TeamDetailsCred">{teamsDetails.name} <br />{teamsDetails.country} <br /></p>
                </div>

                <p>G/W/L {teamsDetails.games}/{teamsDetails.wins}/{teamsDetails.loses}</p>

                <div onClick={() => {

                    removePlayer(p1, 1)
                }}>
                    {p1 && p1.firstName} {p1 && p1.lastName}
                </div>
                <div onClick={() => {
                    removePlayer(p2, 2)
                }}>
                    {p2 && p2.firstName} {p2 && p2.lastName}
                </div>
                <div onClick={() => {

                    removePlayer(p3, 3)
                }}>
                    {p3 && p3.firstName} {p3 && p3.lastName}
                </div>
            
                <Link to='/teams' className="DetailsButton" >Back to Teams</Link>
                <Link to='/teams' className="DetailsButton" onClick={deleteTeam} >Delete Team</Link>
                
            </div>
            
            <div className="TeamDetailsPlayers" >
                {players && Object.entries(players).map((index) => {
                    if (index[1].isInTeam === false) {
                        return (

                            <div key={uuidv1()}>
                                <div onClick={() => addPlayer(index[1])} key={uuidv1()} className="PlayerBox">
                                    <div className="ListNamesContainer">
                                        <p key={uuidv1()} className="ListFirstName">First: {index[1].firstName} </p>
                                        <p key={uuidv1()} className="ListLastName">Last: {index[1].lastName}</p>
                                    </div>
                                    <img src={`data:image/jpeg;base64,${index[1].image}`} alt='player' key={uuidv1()} className="PlayerListImage" />
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            
        </div>
    );
}

export default TeamsDetails;

*/