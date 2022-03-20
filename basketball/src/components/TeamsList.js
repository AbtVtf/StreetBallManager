import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { v1 as uuidv1 } from 'uuid'
import Navbar from './Navbar';

const TeamsList = () => {
    const [teams, setTeams] = useState();
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



    function handleClick(id) {
        history.push("/teams/" + id);
    }


    return (
        <>
        <Navbar/>
        <div className="ListPage">
            <div className="ListContainer">
                {teams && Object.entries(teams).map(([id]) => {
                    return (
                        <div onClick={() => handleClick(teams[id].id)} key={uuidv1()} className="PlayerBox">
                            <div className="ListNamesContainer">
                                <p className="ListFirstName" key={uuidv1()}>{teams[id].name}</p>
                                <p className="ListLastName" key={uuidv1()}>{teams[id].country}</p>
                            </div>
                            <img src={`data:image/jpeg;base64,${teams[id].logo}`} alt='player' key={uuidv1()} className="PlayerListImage" />
                        </div>
                    )
                })}
            </div>
            <div className="ListLorem">
                <h1>DID YOU JUST SAY TEAMS?</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
        </>

    );
}

export default TeamsList