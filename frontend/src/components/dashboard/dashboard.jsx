import React, { useEffect, useState } from "react";
import "./dashboard.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Nav from "../NavBar/nav";

const socket = io("");

function Dashboard() {
	const navigate = useNavigate();

	const [profile, setProfile] = useState({
		name: "",
		email: "",
		batch: "",
		branch: "",
		mobile: "",
	});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const token = localStorage.getItem("token");

				const res = await fetch("/api/auth/profile", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await res.json();

				if (res.ok && data.user) {
					setProfile({
						name: data.user.name || "",
						email: data.user.email || "",
						batch: data.user.batch || "",
						branch: data.user.branch || "",
						mobile: data.user.mobile || "",
					});
				} else {
					console.error("Failed to load profile:", data.message);
				}
			} catch (err) {
				console.error("Error fetching profile:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, []);

	// Navigation handlers
	const Report_issue = () => navigate("/HostelMess_Isuue");
	const search = () => navigate("/searchPeople");
	const InteractSeniors = () => navigate("/InteractSeniors");
	const InteractAlumni = () => navigate("/InteractAlumni");

	// Check if user is a current student
	const isCurrentStudent = Number(profile.batch) >= new Date().getFullYear();

	return (
		<div className="app bbody">
			{/* Header */}
			<Nav />

			{/* Main Content */}
			<main className="main">
				{/* Sidebar */}
				<aside className="sidebar">
					<div className="card">
						<h3>Important Links</h3>
						<ul>
							<li><a href="https://bitmesra.ac.in/Other-Department-Pages/content/1/205/103" target="_blank">Notice</a></li>
							<li><a href="http://pportal.bitmesra.ac.in/home.htm" target="_blank">ERP</a></li>
							<li><a href="https://2plznx.csb.app/" target="_blank">Club Detail</a></li>
							<li><a href="https://bitwelfaresociety.com/" target="_blank">Welfare Society</a></li>
							<li><a href="https://bitmesra.ac.in/show/contacts/1" target="_blank">Contact BIT</a></li>
						</ul>
					</div>
				</aside>

				{/* Center Content */}
				<section className="content">
					{/* Welcome Card */}
					<div className="welcome-card">
						<h1>Hello {profile.name}</h1>
						<h2>Welcome to BIT Community Hub</h2>
						<p>
							A digital space designed for learning and connection. Dive in,
							explore, and let's make every interaction count.
						</p>
					</div>

					{/* Action Cards */}
					<div className="action-grid">
						{isCurrentStudent && (
							<button onClick={Report_issue}>
								<div className="action-card">
									<h3>Report Hostel or Mess Issue</h3>
								</div>
							</button>
						)}
						<button onClick={search}>
							<div className="action-card">
								<h3>Search People</h3>
							</div>
						</button>
						<button onClick={InteractAlumni}>
							<div className="action-card">
								<h3>Alumni Interaction</h3>
							</div>
						</button>
						{isCurrentStudent && (
							<button onClick={InteractSeniors}>
								<div className="action-card">
									<h3>Within College</h3>
								</div>
							</button>
						)}
					</div>
				</section>

				{/* Profile Card */}
				<aside className="profile-card">
					{loading ? (
						<p>Loading profile...</p>
					) : (
						<>
							<div className="profile-circle">👤</div>
							<div className="profile-form">
								<div className="form-group">
									<label>Name:</label>
									<input type="text" value={profile.name} readOnly />
								</div>
								<div className="form-group">
									<label>Email:</label>
									<input type="email" value={profile.email} readOnly />
								</div>
								<div className="form-group">
									<label>Batch:</label>
									<input type="text" value={profile.batch} readOnly />
								</div>
								<div className="form-group">
									<label>Branch:</label>
									<input type="text" value={profile.branch} readOnly />
								</div>
								<div className="form-group">
									<label>Mobile:</label>
									<input type="text" value={profile.mobile} readOnly />
								</div>
							</div>
						</>
					)}
				</aside>
			</main>
		</div>
	);
}

export default Dashboard;
