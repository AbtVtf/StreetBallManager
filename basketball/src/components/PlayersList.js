import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { v1 as uuidv1 } from 'uuid'
import Navbar from './Navbar';
const PlayerList = () => {
    const [players, setPlayers] = useState();
    let history = useHistory();

    useEffect(() => {
        fetch('http://localhost:8000/players/')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setPlayers(data)
            })
    }, [])


    function handleClick(id) {
        history.push("/players/" + id);
    }

    return (
        <>
        <Navbar/>
        <div className="ListPage">
            <div className="ListContainer">
            {localStorage.getItem('IsLogged')==="true" && <p>mwe</p>}
                {players && Object.entries(players).map(([id]) => {
                    return (
                        <div onClick={() => handleClick(players[id].id)} key={uuidv1()} className="PlayerBox">
                            <div className="ListNamesContainer">
                                <p key={uuidv1()} className="ListFirstName">First: {players[id].firstName} </p>
                                <p key={uuidv1()} className="ListLastName">Last: {players[id].lastName}</p>
                            </div>
                            <img src={`data:image/jpeg;base64,${players[id].image}`} alt='player' key={uuidv1()} className="PlayerListImage" />
                        </div>
                    )
                })}
            </div>
            <div className="ListLorem">
                <h1>HOW ABOUT SOME PLAYERS?</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
        </>

    );
}

export default PlayerList