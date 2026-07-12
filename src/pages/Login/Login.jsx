import { useNavigate } from "react-router-dom";
import "../../assets/styles/login.css";

function Login() {

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h2 className="text-center login-title mb-4">
                    TransitOps
                </h2>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label>Email</label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                        />

                    </div>

                    <div className="mb-4">

                        <label>Password</label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                        />

                    </div>

                    <button className="btn btn-primary login-btn">

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;