import "../styles/login.css";

function login(){
    return(
        <>
        <div className="container">
            <div className="login-wrap">
                <div className="sign_in">
                    <label className="label">Sign in</label>
                </div>
                <div className="login-input">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="Email address"/>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    </div>
                </div>
                <button type="button" className="btn btn-outline-primary">Sign in</button>
                <a href="/register">Sign up</a>
            </div>
        </div>
        </>
    );
}

export default login;