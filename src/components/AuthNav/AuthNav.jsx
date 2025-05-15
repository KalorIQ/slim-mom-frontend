import { NavLink } from "react-router";
import style from "./AuthNav.module.css";

const AuthNav = () => {
    return (
        <div className={style.container}>
            <NavLink to="/register" className={style.register}>
                REGISTRATION
            </NavLink>
            <NavLink to="/login" className={style.login}>
                LOG IN
            </NavLink>
        </div>
    )
}
export default AuthNav;