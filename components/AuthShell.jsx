import Logo from './Logo';

export default function AuthShell({ children }) {
  return (
    <main className="auth-page">
      <div className="auth-container">
        <Logo variant="auth" />
        <div className="auth-body">{children}</div>
      </div>
    </main>
  );
}
