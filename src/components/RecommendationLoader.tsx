
import "./styles/RecommandationLoader.css";


const RecommendationLoader = (props) => {

    return (
        <div className="recommendation-loader">
            <div>
                <img src="/images/ai-loading.gif" alt="loader" />
            </div>
            <div className="left">
                <h1>{props.label}</h1>
                <p>
                    OneShoot is processing your request to provide you with the best candidates for your organization.
                </p>
            </div>
           
        </div>
    );
}

export default RecommendationLoader;