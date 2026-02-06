export default function LoginPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>K-Meal Bridge</h1>
        <p>Internal Dashboard Login</p>
        <form>
          <label>
            Email
            <input type="email" placeholder="admin@kmeal.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="????????" />
          </label>
          <button type="button" className="primary-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
