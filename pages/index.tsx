import { useEffect, useState } from "react";
import "../styles/pageDefaultStyles.css";
import LoginForm from "../components/loginForm";
import Dashboard_Client from "../components/Dashboard_Client";
import Dashboard_Admin from "../components/Dashboard_Admin";

export default function Home() {
  type User = {
    name: string;
    password: string;
    userType: "admin" | "client";
  };

  const [logado, setLogado] = useState(false);
  const [usuário, setUsuário] = useState<User | null>(null);
  
  const handleLoginSuccess = (data: User) => {
    setLogado(true);
    setUsuário(data);
  };

  const renderDashboard = () => {
    if (usuário?.userType === "admin") {
      return <Dashboard_Admin user={usuário} />;
    } else if (usuário?.userType === "client") {
      return <Dashboard_Client user={usuário} />;
    } else {
      return <div>Tipo de usuário desconhecido.</div>;
    }
  };

  useEffect(() => {
    document.title = "Precifique";
  }, [])

  return (
    <main className="mainDiv absolute top-0 left-0 overflow-x-hidden overflow-y-hidden w-full h-full bg-neutral-950">
      {!logado ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        renderDashboard()
      )}
    </main>
  );
}