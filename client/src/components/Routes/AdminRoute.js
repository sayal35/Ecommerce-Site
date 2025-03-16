import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      console.log("Token before request:", auth?.token); // Debugging step
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/auth/admin-auth",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, // Ensure proper format
            },
          }
        );
        setOk(res.data.ok);
      } catch (error) {
        console.log("Auth Check Failed:", error.response?.data || error);
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
