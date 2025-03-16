import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(null); // Start with `null` to indicate loading
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      if (!auth?.token) {
        setOk(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        console.log("Auth check response:", res.data); // Debugging
        setOk(res.data.ok ?? false); // Ensure it’s always a boolean
      } catch (error) {
        console.log("Auth Check Failed:", error.response?.data || error);
        setOk(false);
      }
    };

    authCheck();
  }, [auth?.token]);

  if (ok === null) return <Spinner />; // Show loading
  if (ok === false) return <Navigate to="/login" replace />; // Redirect only if explicitly false
  return <Outlet />;
}
