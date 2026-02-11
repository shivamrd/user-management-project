import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }

          .home-container {
            display: flex;
            height: 100vh;
            width: 100%;
          }

          .section {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.5s ease;
          }

          .section h1 {
            font-size: 3rem;
            margin-bottom: 10px;
          }

          .section p {
            font-size: 1.1rem;
            opacity: 0.85;
          }

          /* Login section */
          .login {
            background: #020617;
            color: #ffffff;
          }

          .login:hover {
            flex: 1.2;
            background: #020617;
          }

          /* Signup section */
          .signup {
            background: #f8fafc;
            color: #020617;
          }

          .signup:hover {
            flex: 1.2;
            background: #e2e8f0;
          }

          /* Divider line */
          .divider {
            width: 4px;
            background: linear-gradient(to bottom, #2563eb, #38bdf8);
          }

          @media (max-width: 768px) {
            .home-container {
              flex-direction: column;
            }

            .divider {
              width: 100%;
              height: 4px;
            }
          }
        `}
      </style>

      <div className="home-container">
        <div
          className="section login"
          onClick={() => navigate("/login")}
        >
          <h1>Welcome Back</h1>
          <p>Login to continue</p>
        </div>

        <div className="divider"></div>

        <div
          className="section signup"
          onClick={() => navigate("/signup")}
        >
          <h1>New Here?</h1>
          <p>Create your account</p>
        </div>
      </div>
    </>
  );
};

export default Home;









