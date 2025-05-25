import style from './HomePage.module.css'
import CalculatorForm from "../../components/CalculatorForm/CalculatorForm.jsx"
import MobileBackground from "../../components/Background/MobileBackground.jsx"

const HomePage = () => {
    return (
        <div className={style.App}>    
            <div className={style.container}>
                <CalculatorForm />
                <MobileBackground />
            </div>
        </div>
    )
}

export default HomePage;