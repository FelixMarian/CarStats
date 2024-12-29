import "../styles/register.css";

function register(){
    return(
        <>
        <div className="container">
            <div className="register-wrap">
                <div className="sign_in">
                    <label className="label">Sign up</label>
                </div>
                <div className="register-input">
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="Email address"/>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    </div>
                </div>
                <button type="button" className="btn btn-outline-primary">Sign in</button>
                <a>Sign up</a>
            </div>
        </div>
        </>
    );
}

export default register;