import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("adminToken", data.token);
      window.location.href = "/admin-panel";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex flex-col m-auto gap-5 w-11/12 md:w-1/2">
      <span className="font-bold uppercase">Email:</span>
      <input type="email" onChange={(e) => setEmail(e.target.value)}  className="border-2 border-[#544e4a] rounded-lg p-2"/>
      <span className="font-bold uppercase">Hasło:</span>
      <input type="password" onChange={(e) => setPassword(e.target.value)} className="border-2 border-[#544e4a] rounded-lg p-2" />
      <button onClick={handleLogin} className="bg-[#777777] rounded-full w-1/2 md:w-1/4 my-5 md:my-10 p-4 pl-6 pr-6 text-white text-lg uppercase ">Zaloguj</button>
    </div>
  );
};

export default Login;
