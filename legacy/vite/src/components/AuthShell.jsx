import Logo from './Logo.jsx';

function AuthShell({ children }) {
  return (
    <main className="auth-page">
      <div className="auth-container">
        <Logo variant="auth" />
        <div className="auth-body">{children}</div>
      </div>
    </main>
  );
}

export default AuthShell;
