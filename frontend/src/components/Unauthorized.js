 const Unauthorized = () => {
  return (
    <div className="container mt-5">
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to access this page.</p>
      <a href="/login" className="btn btn-primary">Go to Login</a>
    </div>
  );
}
export default Unauthorized;