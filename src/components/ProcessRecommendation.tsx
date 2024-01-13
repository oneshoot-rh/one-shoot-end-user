
import { useNavigate } from "react-router-dom";
import "./styles/ProcessRecommendation.css";


const ProcessRecommendation = () => {

    const navigate = useNavigate()

    const handleUploadResumes = (route: string) => {
        navigate(`/process/${route}`)
    }


    return (
        <div className="process__recommendation">
            <h1>Process Recommendation</h1>
            <p>
                Make your recruitment process more efficient by using our platform to identify the best candidates for your organization.
            </p>

            <div className="options">
                <div className="option"  onClick={()=>handleUploadResumes('upload')}>
                    <div className="option_icon">
                        <img src="/icons-resume.png" alt="upload" />
                    </div>
                    <div className="option__title">
                        <h3>Upload Resumes</h3>
                    </div>
                    <div className="option__content">
                        <p>I Have a list of resumes that I want to make optimal selection from</p>
                    </div>
                </div>
                <div className="option" onClick={()=>handleUploadResumes('suggest')}>
                    <div className="option_icon">
                        <img src="/icons-candidate.png" alt="upload" />
                    </div>
                    <div className="option__title">
                        <h3>Suggest Candidates</h3>
                    </div>
                    <div className="option__content">
                        <p>I want to suggest a candidate for a specific position</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProcessRecommendation