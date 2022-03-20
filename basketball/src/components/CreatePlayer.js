import { useState, useContext } from 'react';
import GameContext from './GameContext';
import Navbar from './Navbar';
import lscache from "lscache";

const CreatePlayer = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(""); 
    const { imageUploaded, pic, createPlayer } = useContext(GameContext)

    return (
        <>
        <Navbar/>

        {lscache.get("isLogged") === "true" ? <div className='NewPlayerBox'>
            <div >
                <label className='PlayerFirstName' >First Name:</label>
                <input
                    type='text'
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="NameLabels"
                />
                <label className='PlayerLastName'>Last Name:</label>
                <input
                    type='text'
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="NameLabels"
                />
            </div>
            <div className='PlayerImageContainer'>
                <label className='ImageUpload' >Add Photo
                    <input
                        required
                        type="file"
                        name=""
                        id="fileId"
                        onChange={imageUploaded}
                    />
                </label>
                <div className='PlayerImageBox'>
                    {pic && <img src={`data:image/jpeg;base64,${pic}`} alt='muie' className='PlayerImage' />}
                </div>
            </div>
            <div className='BottomPart'>
                <p className='Agreement'>THIS AGREEMENT, makes _{firstName}_{lastName}_ a member of the National Street Basketball Association.</p>
                <div onClick={() => {
                    createPlayer(firstName, lastName, pic)
                }}
                    className='CreateButton'>
                    Create
                </div>
            </div>
        </div>: <div className='NewPlayerBox'><p style={{fontSize:"5em"}}>Please Log In first</p></div>}
        </>
    );
}

export default CreatePlayer;