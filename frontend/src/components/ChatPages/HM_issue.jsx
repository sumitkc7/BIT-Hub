import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./seniors.css";
import Nav from "../NavBar/nav";
import { useNavigate } from "react-router-dom";


const socket = io("");

const H_M_Chat = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [image, setImage] = useState(null);
	const messagesEndRef = useRef(null);
	const navigate = useNavigate();

	const currentUser = "Ushgcfer"; // Replace with dynamic value if needed

		const [name, setName] = useState({
			name: "",
		});
	
		const [loading, setLoading] = useState(true);
	
		// Fetch user profile from backend
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
						setName({ name: data.user.name || "" });
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

	useEffect(() => {
		axios
			.get("/api/messages/HM")
			.then((res) => setMessages(res.data))
			.catch(console.error);

		socket.on("chat message", (msg) => {
			setMessages((prev) => [...prev, msg]);
		});

		return () => socket.off("chat message");
	}, []);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const sendMessage = async () => {
		if (!input.trim() && !image) return;

		const formData = new FormData();
		formData.append("username", name.name);
		formData.append("content", input);
		if (image) {
			formData.append("image", image);
		}

		try {
			const res = await axios.post("/api/messages/HM", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			socket.emit("chat message", res.data); // Emit the full saved message
			setInput("");
			setImage(null);
		} catch (err) {
			console.error("Message send failed", err);
		}
	};
	useEffect(() => {
			const token = localStorage.getItem("token");
			// console.log("Token:", token);
			if (!token) {
				navigate("/landing");
			}
		}, []); 

	return (

		<div className="all"><Nav/>

		<div className="chat-container">
      
			<div className="chat-box">
				<div className="chat-header">
					<h2>Chat</h2>
					<button className="chat-header-btn">LET'S CHAT APP</button>
				</div>

				<div className="chat-messages">
					{messages.map((msg, idx) => {
						const isCurrentUser = msg.username === name.name;
						return (
							<div
								key={idx}
								className={`message-row ${isCurrentUser ? "sent" : "received"}`}
							>
								<div className="message-bubble">
									<p className="message-username">{msg.username}</p>
									<p className="message-text">{msg.content}</p>
									{msg.image && (
										<img
											src={msg.image}
											alt="attachment"
											className="message-image"
										/>
									)}
									<p className="message-time">
										{new Date(msg.createdAt).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</p>
								</div>
							</div>
						);
					})}
					<div ref={messagesEndRef} />
				</div>

				<div className="chat-input-container">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type message"
						className="chat-input"
					/>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
						className="chat-file-input"
					/>
					<button onClick={sendMessage} className="chat-send-btn">
						Send
					</button>
				</div>
			</div>
		</div>
</div>
	);
};

export default H_M_Chat;
