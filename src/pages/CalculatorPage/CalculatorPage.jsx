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
      <div className={style.rightSection}>
        <Summary />
      </div>
    </div>
  );
};

export default CalculatorPage;
