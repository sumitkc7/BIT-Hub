import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log("Token:", token);
		if (!token) {
			navigate("/landing");
		}
	}, []); 
	return (
		<>
			<Dashboard />
		</>
	);
}

export default App;
