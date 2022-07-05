import './index.css';
import AppRouter from "./components/AppRouter";
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner";
import {useSelector} from "react-redux";


function App() {
    // const {loading} = useSelector(state => state.Loading)

    return (
        <>
            <div className="App">
                <AppRouter/>
            </div>
        </>
    );
}

export default App;
