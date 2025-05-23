import style from "./CalculatorPage.module.css";
import UpdateUserInfoForm from "../../components/CalculatorForm/UpdateUserInfoForm.jsx";
const CalculatorPage = () => {

  return (
    <div className={style.App}>
      <div className={style.container}>
        <UpdateUserInfoForm />
      </div>
    </div>
  );
};

export default CalculatorPage;
