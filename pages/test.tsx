import "../styles/pageDefaultStyles.css";

export default function Home() {
  return (
    <main className="absolute top-0 left-0 overflow-x-hidden w-full h-full bg-gray-500">
      <div className="absolute rounded-sm text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[350px] bg-white">
        <div className="absolute w-fit h-fit left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-3xl mt-[20px]">Login</h1>
          <div className="relative mt-[30px] w-fit h-auto left-1/2 transform -translate-x-1/2">
            <h2 className="absolute w-[65px] top-[-12px] left-[10px] bg-white">Usuário</h2>
            <input className="rounded-xl pl-[10px] pr-[10px] border-gray border-2 h-[40px] w-[180px]"></input>
          </div>
          <div className="relative mt-[20px] w-fit h-auto left-1/2 transform -translate-x-1/2">
            <h2 className="absolute w-[55px] top-[-12px] left-[10px] bg-white">Senha</h2>
            <input className="rounded-xl pl-[10px] pr-[10px] border-gray border-2 h-[40px] w-[180px]"></input>
          </div>
          <button className="relative rounded-xl w-[80px] h-[35px] mt-[20px] bg-blue-400 hover:bg-blue-500">Entrar</button>
        </div>
      </div>
    </main>
  );
}