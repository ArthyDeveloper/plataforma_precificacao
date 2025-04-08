import "../styles/pageDefaultStyles.css";
import LoginForm from "../components/loginForm";
import Dashboard_Client from "../components/Dashboard_Client";
import Dashboard_Admin from "../components/Dashboard_Admin";

export default function Home() {
  return (
    <main className="absolute top-0 left-0 overflow-x-hidden w-full h-full bg-gray-800">
      {/*<LoginForm/>*/}
      {<Dashboard_Admin/>}
    </main>
  );
}