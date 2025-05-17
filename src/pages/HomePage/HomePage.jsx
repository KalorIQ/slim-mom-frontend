
import style from './HomePage.module.css'
import CalculatorForm from "../../components/CalculatorForm/CalculatorForm.jsx"

const HomePage = () => {
    return (
        <div className={style.App}>    
            <div className={style.container}>
                <CalculatorForm />
            </div>
        </div>
    )
}

export default HomePage;