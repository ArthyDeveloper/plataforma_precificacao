import { useState } from "react";
import "../styles/pageDefaultStyles.css";
import LoginForm from "../components/loginForm";
import Dashboard_Client from "../components/Dashboard_Client";
import Dashboard_Admin from "../components/Dashboard_Admin";

export default function Home() {
  const [logado, setLogado] = useState(false);
  const [usuário, setUsuário] = useState<User | null>(null);

  type User = {
    name: string;
    userType: "admin" | "client";
  };

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

  return (
    <main className="absolute top-0 left-0 overflow-x-hidden w-full h-full bg-gray-800">
      {!logado ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        renderDashboard()
      )}
    </main>
  );
}