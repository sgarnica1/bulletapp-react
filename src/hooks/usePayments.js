import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getPaymentsApi } from "../api/payments";

const usePayments = () => {
  const [payments, setPayments] = useState(null);
  const [totalPaymentsAmount, setTotalPaymentsAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { authTokens, logoutUser } = useAuth();

  const getPayments = async () => {
    try {
      setLoading(true);
      const res = await getPaymentsApi(authTokens.access, logoutUser);
      setPayments(res);
      setTotalPaymentsAmount(
        res.reduce((total, payment) => total + parseFloat(payment.quantity), 0)
      );

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { payments, loading, error, totalPaymentsAmount, getPayments };
};

export { usePayments };
