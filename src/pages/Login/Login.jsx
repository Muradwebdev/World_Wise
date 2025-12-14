import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import { useAuth } from "../../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
export default function Login() {
  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated } = useAuth();

  function handlerSubmit(e) {
    if (!email && !password)
      return alert("Numune verilen e-mail ve password -u daxil edin.");
    e.preventDefault();
    login(email, password);
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated]);

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handlerSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="murad123@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="12345678"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button className={styles.btn} type="primary">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
