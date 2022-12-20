import { API_BASE_URL } from "../utils/requests";
import { formatDate } from "../utils/utils";

const getPaymentsApi = async (token, callback) => {
  try {
    const res = await fetch(API_BASE_URL + "/payments/", fetchConfigGET(token));
    const data = await res.json();
    if (res.statusText === "Unauthorized") return callback();
    return updatePayments(token, data);
  } catch (err) {
    throw err;
  }
};

// UTILS

const fetchConfigGET = (token) => ({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + String(token),
  },
});

function updatePayments(token, data) {
  const updatedPayments = data.map((payment) => {
    payment.date = formatDate(payment.date);

    const getAthlete = fetch(payment.athlete, fetchConfigGET(token))
      .then((response) => {
        if (response.ok) return response.json();
        throw Error("Cannot fetch");
      })
      .then(
        (data) => (payment.athlete = `${data.first_name} ${data.last_name}`)
      );

    const getPlan = fetch(payment.plan, fetchConfigGET(token))
      .then((response) => {
        if (response.ok) return response.json();
        throw Error("Cannot fetch");
      })
      .then((data) => (payment.plan = data.name));

    return Promise.all([getAthlete, getPlan]).then(() => payment);
  });
  return Promise.all(updatedPayments).then((payments) => payments);
}

export { getPaymentsApi };
