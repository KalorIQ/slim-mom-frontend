import style from "./CalculatorPage.module.css";
import CalculatorForm from "../../components/CalculatorForm/CalculatorForm.jsx";

const CalculatorPage = () => {
  return (
    <div className={style.App}>
      <div className={style.container}>
        <CalculatorForm />
      </div>
    </div>
  );
};

export default CalculatorPage;
