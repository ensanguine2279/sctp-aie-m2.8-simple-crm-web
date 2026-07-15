// src/pages/WelcomePage.jsx
import { Link, Navigate } from "react-router";

import { useAuth } from "../contexts/AuthContextInstance";

import styles from "./WelcomePage.module.css";

function WelcomePage() {
  const { user } = useAuth();

  // Short-circuit: If the user is logged in, immediately render the Redirect component instead
  // Added replace to overwrite the current entry in the browser's history stack instead of adding a new one.
  // This ensures that once the user is redirected to /app, clicking the browser's Back button won't trap
  // user in a repeated loop of going back to /login, redirected to /app again.
  if (user) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <div className={styles.logoMark}>
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <h1 className={styles.heading}>Simple CRM</h1>
        <p className={styles.lead}>Manage your customers in one place.</p>

        <Link to="/login" className={styles.loginBtn}>
          Log In
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
