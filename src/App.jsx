import Header from "./features/Ui/Header/Header";
import Footer from "./features/Ui/Footer/Footer";
import {Outlet} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default App;
