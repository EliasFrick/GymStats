import Sidebar from "../src/Navigation/Sidebar";
import {useMyLoginContext} from './Provider/LoginProvider'
import {LoginPage} from "./Navigation/ChooseStackScreen";


export default function AutoLogin() {
    const {loggedIn, email, age, username, setLoggedIn, setAge, setUsername, setEmail} = useMyLoginContext();

    if (loggedIn) {
        return (
            <Sidebar />
        )
    } else {
        return (
            <LoginPage/>
        )
    }
}
