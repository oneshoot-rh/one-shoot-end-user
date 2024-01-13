
import "./styles/Home.css";


const Home = () => {
    const getStartedHandler = () => {
        window.location.href = "/process";
    }

    return (
        <div className="home">
            <h1>OneShoot RH</h1>

            <div className="home__content">
                Our project is dedicated to revolutionizing the field of IT talent acquisition and recruitment by introducing an innovative platform that optimizes and accelerates the entire process. By bridging the gap between Human Resources (HR) teams and IT professionals seeking employment, our platform serves as a dynamic solution that empowers HR professionals to efficiently identify and engage with candidates whose qualifications align seamlessly with their organization's needs.
            </div>

            <div className="call_to_action">
                <button onClick={getStartedHandler}>Get Started</button>
            </div>
        </div>
    );
}


export default Home;