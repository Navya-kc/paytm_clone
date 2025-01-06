import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { UserPage } from "./pages/UserPage";
import "./index.css";

function App() {
  const pages = [
    { path: "/signup", name: "Sign Up" },
    { path: "/signin", name: "Sign In" },
    { path: "/dashboard", name: "Dashboard" },
    { path: "/send", name: "Send Money" },
    { path: "/user/123", name: "User Page" }, // Example user ID
  ];

  return (
    <BrowserRouter>
      <div className="container mx-auto p-6 min-h-screen">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">PayTM Clone</h1>
          <nav className="text-center">
            {/* Navigation Links */}
            {pages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="mx-4 text-blue-600 underline hover:text-blue-800"
              >
                {page.name}
              </Link>
            ))}
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/user/:userId" element={<UserPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
