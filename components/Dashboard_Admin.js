import styles from "../styles/dashboardAdmin.css";

const Dashboard_Admin = () => {
  return(
    <div className="absolute top-0 left-0 w-full h-full bg-gray-500 overflow-x-hidden">
      <div className="relative rounded-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-gray-700 overflow-hidden">
        {/* Top Bar - Options */}
        <div className="relative rounded-t-sm w-full h-[40px] bg-gray-800 justify-evenly flex text-white text-center">
          <button className="btnAdminSelector">Users</button>
          <button className="btnAdminSelector">Register</button>
          <button className="btnAdminSelector">Remove</button>
        </div>
        {/* Register Form */}
        <div className="relative w-full h-auto bg-gray-700"></div>
      </div>
    </div>
  );
};

export default Dashboard_Admin;