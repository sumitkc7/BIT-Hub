import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./components/ChatPages/seniors.jsx";
import AlumniChat from "./components/ChatPages/alumni.jsx";
import RegisterForm from "./components/AuthPages/register.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import Search from "./components/Searchpeople/search.jsx";
import H_M_Chat from "./components/ChatPages/HM_issue.jsx";
import Langing from "./components/LandingPage/Landing.jsx";
import LoginForm from "./components/AuthPages/login.jsx";
// ✅ Define router here
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: <LoginForm />,
	},
	
	{
		path: "/landing",
		element: <Langing />,
	},

	{
		path: "/searchPeople",
		element: < Search/>,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
	{
		path: "/InteractSeniors",
		element: <Chat />,
	},
	{
		path: "/InteractAlumni",
		element: <AlumniChat />,
	},
	
	{
		path: "/HostelMess_Isuue",
		element: <H_M_Chat />,
	},

	{
		path: "/Register",
		element: <RegisterForm />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
