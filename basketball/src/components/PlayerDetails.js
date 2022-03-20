import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import { useHistory } from "react-router-dom";
import lscache from "lscache";


const PlayerDetails = () => {
    let { playerId } = useParams();
    let history = useHistory();

    const [playerDetails, setPlayerDetails] = useState([]);

    useEffect(() => {
        if(playerId){
            fetch('http://localhost:8000/players/' + playerId)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setPlayerDetails(data);
            })
        }
    }, [playerId])
    const deletePlayer = ()=>{
        fetch('http://localhost:8000/players/' + playerId, {
            method: 'DELETE'
        })
        history.push("/players/");
    }
    return (
        <>
        <Navbar/>
        <div className='PlayerDetailsContainer'>
            <div className="PlayerDetInfo">
                <p className="">{playerDetails.firstName || ""} {playerDetails.lastName || ""} </p>
                {playerDetails && <img className="PlayerDetPic" src={`data:image/jpeg;base64,${playerDetails.image}`} alt='player' />}
            </div>
            <div className="">
                <p className="">SKILLS</p>
                <p className="">Shooting: {playerDetails.shooting}</p>
                <p className="">Dribble: {playerDetails.dribble}</p>
                <p className="">Defense: {playerDetails.defense}</p>
            </div>
            <div className="PlayerDetailsButton">
                <Link to='/players' className="DetailsButton" >Players List</Link>
            </div>
            <div className="PlayerDetailsButton">
            {lscache.get("isLogged") === "true" && <div className="DetailsButton" onClick={deletePlayer}>Delete Player</div>}

            </div>
        </div>
        </>
    );
}

export default PlayerDetails;