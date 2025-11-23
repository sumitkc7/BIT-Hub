import React, { useState } from "react";
import "../dashboard/dashboard.css";
import { useNavigate } from "react-router-dom";

import { FiAlignJustify } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { HiAcademicCap } from "react-icons/hi";
// import { CgProfile } from "react-icons/cg";

const NavIcon = ({ icon: Icon, label, onClick }) => (
  <li
    onClick={onClick} // 🔥 Add this to trigger navigation
    className="relative group text-[3.8vh] icon cursor-pointer text-violet-700 transition-all duration-200 ease-out"
  >
    <div className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:text-purple-700">
      <Icon />
    </div>
    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out whitespace-nowrap z-10">
      {label}
    </span>
  </li>
);

function Nav() {
	const navigate = useNavigate();
	const Report_issue = ()=>{
		navigate('/HostelMess_Isuue')
	}
	const search = ()=>{
		navigate('/searchPeople')
	}
	

	const InteractSeniors = () => {
		navigate("/InteractSeniors");
	};
	const InteractAlumni = () => {
		navigate("/InteractAlumni")
	}
	const Home = () => {
		navigate("/")
	}
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    batch: "",
    branch: "",
  });


  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/landing");
  };

  return (
    <div>
      <header className="header">
        <div className="logo font-bold text-xl text-violet-700">BIT Comm. Hub</div>

        <nav className="beechKa hidden text-violet-700 md:block mt-8">
          <ul className="flex gap-10">
            <NavIcon icon={FaHome} onClick={Home} label="Home" />
            <NavIcon icon={BiSolidBuildingHouse} onClick={Report_issue} label="Hostel / Mess Issue" />
            <NavIcon icon={FaPeopleGroup} onClick={search} label="Find People" />
            <NavIcon icon={FaChalkboardTeacher} onClick={InteractAlumni} label="Alumni Interaction" />
            <NavIcon icon={HiAcademicCap} onClick={InteractSeniors} label="Within College" />
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="update-btn text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-all duration-200"
        >
          Logout
        </button>
      </header>
    </div>
  );
}

export default Nav;
