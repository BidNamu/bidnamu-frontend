import Header from "./features/Ui/Header/Header";
import Footer from "./features/Ui/Footer/Footer";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import { useAtomValue, useSetAtom} from "jotai";
import {logInAtom} from "./store/userInfo";
import {isLogInSuccessAtom} from "./store/flagState";

function App() {
    const isLogInSuccess = useAtomValue(isLogInSuccessAtom)
    const setLogInAtom = useSetAtom(logInAtom)
    useEffect(() => {
        setLogInAtom({
            isLogIn: true,
            nickname: "asd"
        })
    }, [isLogInSuccess]);
    return (
        <div className="App">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default App;
