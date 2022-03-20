import {Link} from 'react-router-dom'
import Navbar from './Navbar';
const HomePage = () => {
    return ( 
        <>
        <Navbar/>
        <div className="HomeContainer">
            <div className="PlayerHomeContainer">
                <h1 className="CallToAction">The Ultimate Streetball Experience</h1>
            </div>

            <div className="HomeBar">
                <Link to='/create-player' className="HomeButton">START NOW</Link>
                
            </div>
        </div>
        </>
     );
}
 
export default HomePage;