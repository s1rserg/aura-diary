import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Input from "../../input/Input";
import Button from "../../button/Button";

import "../SignInSignUp.css";
import { signIn } from "../../../store/auth/actions";
import { useAppDispatch } from "../../../hooks/hooks";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Invalid email format");
    } else if (formData.password.length < 3 || formData.password.length > 20) {
      setError("Password must be between 3 and 20 characters long");
    } else {
      try {
        await dispatch(signIn(formData)).unwrap();
        navigate("/");
      } catch (err) {
        setError("Sign-in failed");
      }
    }
  };

  return (
    <main className="sign-in-page">
      <AuthForm
        className="sign-in-form"
        titleClassName="sign-in-form__title"
        title="Sign In"
        onSubmit={handleSubmit}
      >
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        {error && <small className="error-text">{error}</small>}
        <Button data-test-id="auth-submit" className="button" type="submit">
          Sign In
        </Button>
      </AuthForm>
      <span>
        Don't have an account?&nbsp;
        <Link
          data-test-id="auth-sign-up-link"
          to="/sign-up"
          className="sign-in-form__link"
        >
          Sign Up
        </Link>
      </span>
    </main>
  );
};

export default SignIn;
