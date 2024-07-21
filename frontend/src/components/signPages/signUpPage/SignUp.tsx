import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Input from "../../input/Input";
import Button from "../../button/Button";

import "../SignInSignUp.css";
import { signUp } from "../../../store/auth/actions";
import { useAppDispatch } from "../../../hooks/hooks";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

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
        await dispatch(signUp(formData)).unwrap();
        navigate("/");
      } catch (err) {
        setError("Sign-up failed");
      }
    }
  };

  return (
    <main className="sign-up-page">
      <AuthForm
        className="sign-up-form"
        titleClassName="sign-up-form__title"
        title="Sign Up"
        onSubmit={handleSubmit}
      >
        <Input
          label="Full name"
          name="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={handleChange}
          dataTestId="auth-full-name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          dataTestId="auth-email"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          dataTestId="auth-password"
        />
        {error && <small className="error-text">{error}</small>}
        <Button data-test-id="auth-submit" className="button" type="submit">
          Sign Up
        </Button>
      </AuthForm>
      <span>
        Already have an account?&nbsp;
        <Link
          data-test-id="auth-sign-in-link"
          to="/sign-in"
          className="sign-up-form__link"
        >
          Sign In
        </Link>
      </span>
    </main>
  );
};

export default SignUp;
