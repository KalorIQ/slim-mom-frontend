import Background from "../../components/Background/Background.jsx"
import style from './HomePage.module.css'
import CalculatorForm from "../../components/CalculatorForm/CalculatorForm.jsx"
import Flowing from "../../components/FlowingMenu/Flowing.jsx"

const HomePage = () => {
    return (
        <div className={style.App}>    
            <div className={style.container}>
            
                <Background />
                <CalculatorForm />
            </div>
            <div className={style.flowingContainer}>
                <Flowing />
            </div>
        </div>
    )
}

export default HomePage;