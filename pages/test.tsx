import "../styles/pageDefaultStyles.css";
import LoginForm from "../components/loginForm";

export default function Home() {
  return (
    <main className="absolute top-0 left-0 overflow-x-hidden w-full h-full bg-gray-500">
      <LoginForm/>
    </main>
  );
}