import Header from "../components/Header"
import Tracker from "../components/Tracker"

const Home = () => {
    return (
        <div className="card">
            <Header loggedin={true} />
            <Tracker />
        </div>
    )
}

export default Home;