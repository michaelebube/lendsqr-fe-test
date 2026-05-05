import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginArt from '../assets/Ani.svg';
import { Logo } from '../components/Logo';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.includes('@') || password.trim().length < 4) {
      setError('Enter a valid email and password.');
      return;
    }

    navigate('/dashboard/users');
  }

  return (
    <main className="login-page">
      <section className="login-page__illustration" aria-label="Lendsqr sign in">
        <Logo />
        <img className="login-art" src={loginArt} alt="" aria-hidden="true" />
      </section>
      <section className="login-page__form-panel">
        <form className="login-card" onSubmit={handleSubmit} noValidate>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              aria-invalid={Boolean(error)}
            />
          </label>
          <label>
            <span>Password</span>
            <div className="login-card__password">
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                aria-invalid={Boolean(error)}
              />
              <button type="button" aria-label="Show password">
                Show
              </button>
            </div>
          </label>
          {error && <p className="form-error">{error}</p>}
          <a href="/login">Forgot password?</a>
          <button className="primary-button" type="submit">
            Log In
          </button>
        </form>
      </section>
    </main>
  );
}
