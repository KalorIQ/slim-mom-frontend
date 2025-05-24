import style from "./CalculatorPage.module.css";
import UpdateUserInfoForm from "../../components/CalculatorForm/UpdateUserInfoForm.jsx";
import Summary from "../../components/Summary/Summary.jsx";
const CalculatorPage = () => {

  return (
    <div className={style.App}>
      <div className={style.container}>
        <div className={style.formSection}>
          <UpdateUserInfoForm />
        </div>
      </div>
        <Summary />
    </div>
  );
};

export default CalculatorPage;
