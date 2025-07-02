import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Input from '../../input/Input';
import Button from '../../button/Button';
import { signUp } from '../../../store/auth/actions';
import { useAppDispatch } from '../../../hooks/hooks';
import '../SignInSignUp.css';
import { useTranslation } from 'react-i18next';

const SignUp: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError('Invalid email format');
    } else if (formData.password.length < 3 || formData.password.length > 20) {
      setError('Password must be between 3 and 20 characters long');
    } else {
      try {
        await dispatch(signUp(formData)).unwrap();
        navigate('/');
      } catch (err) {
        setError('Sign-up failed');
      }
    }
  };

  return (
    <main className="sign-up-page">
      <AuthForm
        className="sign-up-form"
        titleClassName="sign-up-form__title"
        title={t('sign up')}
        onSubmit={handleSubmit}
      >
        <Input
          label={t('full name')}
          name="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={handleChange}
        />
        <Input
          label={t('email')}
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label={t('password')}
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        {error && <small className="error-text">{error}</small>}
        <Button className="button" type="submit">
          {t('sign up')}
        </Button>
      </AuthForm>
      <span>
        {t('already have account')}&nbsp;
        <Link to="/sign-in" className="sign-up-form__link">
          {t('sign in')}
        </Link>
      </span>
    </main>
  );
};

export default SignUp;
