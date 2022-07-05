import './LoadingSpinner.scss'
import LoadingSpin from "react-loading-spin";

function LoadingSpinner() {
    return (
        <div className={"loading-spinner-wrapper"}>
            <div className="loading-spinner">
                <LoadingSpin/>
            </div>
        </div>
    )
}

export default LoadingSpinner
