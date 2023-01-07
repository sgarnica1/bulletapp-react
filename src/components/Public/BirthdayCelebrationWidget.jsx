import { info } from "../../utils/info";

// IMG
import BirthdayCake from "../../assets/img/birthday-cake.png";

const BirthdayCelebrationWidget = ({ user }) => {
  const name = user?.data[info.firebase.docKeys.users.firstName];
  const birthDay = user?.data[info.firebase.docKeys.users.birthDay];
  const birthMonth = user?.data[info.firebase.docKeys.users.birthMonth];

  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;

  if(birthDay !== todayDay || birthMonth !== todayMonth) return null;
  return (
    <article className="BirthdayCelebrationWidget">
      <div className="BirthdayCelebrationWidget__info">
        <h2 className="BirthdayCelebrationWidget__title">¡Feliz Cumpleaños!</h2>
        <p className="BirthdayCelebrationWidget__description">
          Toda la familia Bullet te desea el mejor de los cumpleaños
          {` ${name}`}.
        </p>
        {/* <p className="BirthdayCelebrationWidget__extra">
          No olvides pasar a la recepción por tus burpees de regalo.
        </p> */}
      </div>
      <img
        src={BirthdayCake}
        alt="Birthday Cake Drawing"
        className="BirthdayCelebrationWidget__img"
      />
    </article>
  );
};

export { BirthdayCelebrationWidget };
