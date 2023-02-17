import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './login.css';

const Login = () => {
  const [credential, setCredential] = useState({
    username: undefined,
    password: undefined,
  });

  const { error, loading, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredential((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/login', credential);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      navigate('/');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.meta });
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <div className="login">
            {error && (
              <span>
                <h5 style={{ color: 'red', fontStyle: 'italic' }}>
                  {error.message}
                </h5>
              </span>
            )}
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                onChange={handleChange}
                id="password"
              />
            </div>
            <button
              disabled={loading}
              onClick={handleClick}
              className="button login__submit"
            >
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
