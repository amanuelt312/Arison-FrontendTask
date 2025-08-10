import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Check, CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const isValidEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  return (
    <div className="flex items-center justify-center  min-h-screen ">
      <div className="bg-background p-10 rounded-3xl w-full md:w-xl">
        <div>
          <h1 className="text-3xl font-bold text-center">
            Hi, Welcome Back! 👋
          </h1>
        </div>

        <div className="mt-10 space-y-5">
          <Input
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error=""
            endIcon={
              isValidEmail ? (
                <Check className="bg-primary text-white rounded-full p-1 shrink-0" />
              ) : null
            }
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error=""
          />
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setRememberMe(!rememberMe)}
            >
              {rememberMe ? (
                <div className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-5 h-5 border border-gray-300 rounded-full" />
              )}

              <p>Remember me</p>
            </div>
            <Link to="/forgot-password" className="hover:text-black/80">
              Forgot Password?
            </Link>
          </div>
          <div>
            <Button className="w-full">Log in</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
