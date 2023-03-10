import { useEffect } from "react";
import { formatCurrency } from "../../utils/utils";
import { useAuth } from "../../contexts/AuthContext";
import { useAthletes } from "../../hooks/useAthletes";
import { usePayments } from "../../hooks/usePayments";
import { usePlans } from "../../hooks/usePlans";
import { info } from "../../utils/info";
// Components
import { HomeBanner } from "../../components/HomeBanner";
import { StatCard } from "../../components/StatCard/StatCard";
import { LoadingStatCard } from "../../components/StatCard/LoadingStatCard";
import { ContentContainer } from "../../components/ContentContainer/ContentContainer";
import { AthletesList } from "../../components/AthletesList/AthletesList";
import { AthleteRow } from "../../components/AthletesList/AthleteRow";
import { CardsList } from "../../components/CardsList";
import { PlansCard } from "../../components/PlansCard/PlansCard";
import { LoadingPlansCard } from "../../components/PlansCard/LoadingPlansCard";
import { ToolsCard } from "../../components/ToolsCard";
import { ErrorBanner } from "../../components/ErrorBanner/ErrorBanner";

function Dashboard() {
  const { user, loading } = useAuth();

  // const {
  //   athletes,
  //   loading: loadingAthletes,
  //   error: errorAthletes,
  //   actions: athleteActions,
  // } = useAthletes();

  // const {
  //   payments,
  //   loading: loadingPayments,
  //   error: errorPayments,
  //   totalPaymentsAmount,
  //   getPayments,
  // } = usePayments();

  // const {
  //   plans,
  //   loading: loadingPlans,
  //   error: errorPlans,
  //   getPlans,
  // } = usePlans();

  // useEffect(() => {
  //   athleteActions.getAthletes();
  //   getPayments();
  //   getPlans();
  // }, []);

  // TODO - Add loading state
  return (
    <div className="Dashboard">
      {loading && <DashboardBanner user={"Loading..."}></DashboardBanner>}
      {!loading && (
        <DashboardBanner
          user={
            user?.data?.first_name
              ? user.data[info.firebase.docKeys.users.firstName]
              : user.data[info.firebase.docKeys.users.email]
          }
        ></DashboardBanner>
      )}
    </div>
  );
  // return (
  //   <div className="Dashboard">
  //     <DashboardBanner
  //       user={
  //         user.firstName
  //           ? user.firstName
  //           : user.email
  //       }
  //     >
  //       {!errorPayments &&
  //         loadingPayments &&
  //         new Array(3)
  //           .fill()
  //           .map((_, index) => <LoadingStatCard key={index} />)}

  //       {!errorPayments && !loadingPayments && (
  //         <>
  //           <StatCard
  //             title={"Ingresos mensuales"}
  //             data={formatCurrency(totalPaymentsAmount)}
  //             route={"/pagos"}
  //           />
  //           <StatCard
  //             title={"Pagos totales"}
  //             data={payments?.length}
  //             route={"/pagos"}
  //           />
  //           <StatCard
  //             title={"Atletas inscritos"}
  //             data={athletes?.length}
  //             route={"/atletas"}
  //           />
  //         </>
  //       )}
  //     </DashboardBanner>

  //     <ContentContainer>
  //       <AthletesList
  //         title={"Pagos realizados"}
  //         route={"/pagos"}
  //         header={"Pagos"}
  //         error={errorPayments}
  //         loading={loadingPayments}
  //         data={payments}
  //         activeView={"Pagos"}
  //         // Render functions
  //         onError={() => (
  //           <ErrorBanner description={"Ocurri?? un error al cargar los pagos"} />
  //         )}
  //         render={(payment) => (
  //           <AthleteRow
  //             key={payment.id}
  //             id={payment.id}
  //             name={payment.athlete}
  //             date={payment.date}
  //             plan={payment.plan}
  //             params={formatCurrency(payment.quantity)}
  //             endpoint={"payments"}
  //           />
  //         )}
  //       ></AthletesList>

  //       <AthletesList
  //         title={"Inscripciones recientes"}
  //         route={"/atletas"}
  //         header={"Clase"}
  //         error={errorAthletes}
  //         loading={loadingAthletes}
  //         data={athletes}
  //         activeView={"Atletas"}
  //         // Render functions
  //         onError={() => (
  //           <ErrorBanner
  //             description={
  //               "Ocurri?? un error al cargar la informaci??n de los atletas"
  //             }
  //           />
  //         )}
  //         render={(athlete) => (
  //           <AthleteRow
  //             key={athlete.id}
  //             id={athlete.id}
  //             name={`${athlete.first_name} ${athlete.last_name}`}
  //             date={athlete.created}
  //             plan={athlete.plan}
  //             params={athlete.schedule}
  //             endpoint={"athletes"}
  //           />
  //         )}
  //       ></AthletesList>

  //       <CardsList title={"Planes"}>
  //         {errorPlans && (
  //           <ErrorBanner
  //             description={"Ocurri?? un error al cargar los planes"}
  //           />
  //         )}
  //         {!errorPlans &&
  //           loadingPlans &&
  //           new Array(6)
  //             .fill()
  //             .map((_, index) => <LoadingPlansCard key={index} />)}
  //         {!errorPlans &&
  //           !loadingPlans &&
  //           plans.map((plan) => (
  //             <PlansCard
  //               key={plan.id}
  //               id={plan.id}
  //               title={plan.name}
  //               price={formatCurrency(plan.price)}
  //             />
  //           ))}
  //       </CardsList>
  //       <CardsList title={"Herramientas"}>
  //         <ToolsCard
  //           route={"/herramientas/programacion"}
  //           title={"Programaci??n"}
  //           styleClass={"programming"}
  //         />
  //         <ToolsCard
  //           route={"/herramientas/videos"}
  //           title={"Videos"}
  //           styleClass={"video"}
  //         />
  //       </CardsList>
  //     </ContentContainer>
  //   </div>
  // );
}

export { Dashboard };
