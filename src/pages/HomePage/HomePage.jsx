import Background from "../../components/Background/Background";
import CalculatorForm from "../../components/CalculatorForm/CalculatorForm.jsx";
import Flowing from "../../components/FlowingMenu/Flowing.jsx";
import Navigation from "../../components/Nav/Navigation.jsx";
import style from "./HomePage.module.css";
const HomePage = () => {
    return (
        <div>
            <Background />
            <div className={style.container}>
                <div className={style.navContainer}>
                    <Navigation />
                </div>
                <div className={style.contentContainer}>
                    <CalculatorForm />
                    <Flowing />
                </div>
            </div>
        </div>
    )
};

export default HomePage;