// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Simulate login
//     const userData = {
//       name: "John Doe",
//       email,
//       profileImage: "https://example.com/profile.jpg"
//     };
    
//     localStorage.setItem("user", JSON.stringify(userData));
//     navigate("/");
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;
