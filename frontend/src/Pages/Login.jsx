import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthContex } from "../contex/AuthContex";
import { BACKEND_URL } from "../constants/api";

const Login = () => {
  const { setAuthUser } = useAuthContex();
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const checkeref = useRef(null);

  const handleLoginbackend = async () => {
    try {
      const loginUser = {
        email: emailref.current.value,
        password: passwordref.current.value,
      };

      if (emailref.current.value === "" && passwordref.current.value !== "") {
        alert("Please fill the email field");
        return;
      } else if (
        passwordref.current.value === "" &&
        emailref.current.value !== ""
      ) {
        alert("Please fill the password field");
        return;
      } else if (
        passwordref.current.value === "" &&
        emailref.current.value === ""
      ) {
        alert("Please fill the password and email field");
        return;
      } else if (!checkeref.current.checked) {
        alert("Please agree with the terms and conditions");
        return;
      }

      const result = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        loginUser
      );
      if (result.status === 200 && result.data) {
        localStorage.setItem("chat-User", JSON.stringify(result.data));
        setAuthUser(result.data);
        alert("Login successful!");
      } else {
        alert("Invalid login credentials.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #3b82f6, #1e293b, #000000)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'rgba(226, 232, 240, 0.85)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        borderRadius: '0.5rem',
        width: '100%',
        maxWidth: '28rem',
        padding: '2rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            color: '#1d4ed8',
            textAlign: 'center'
          }}>Welcome Back!</h1>
          <p style={{ textAlign: 'center', color: '#4b5563' }}>
            Log in to access your account
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label>
            <span style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#1e3a8a'
            }}>Email Address</span>
            <input
              ref={emailref}
              type="email"
              placeholder="Enter your email"
              required
              style={{
                marginTop: '0.25rem',
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                outline: 'none'
              }}
            />
          </label>
          <label>
            <span style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#1e3a8a'
            }}>Password</span>
            <input
              ref={passwordref}
              type="password"
              placeholder="Enter your password"
              required
              style={{
                marginTop: '0.25rem',
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                outline: 'none'
              }}
            />
          </label>
        </div>

        <div style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            <input type="checkbox" ref={checkeref} style={{ marginRight: '0.5rem' }} />
            Remember Me
          </p>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={handleLoginbackend}
            style={{
              width: '100%',
              padding: '0.5rem',
              color: '#fff',
              backgroundColor: '#2563eb',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              outline: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Log In
          </button>
        </div>

        <p style={{
          fontSize: '0.875rem',
          textAlign: 'center',
          color: '#4b5563',
          marginTop: '1rem'
        }}>
          New here?{" "}
          <Link to="/signup" style={{
            color: '#2563eb',
            fontWeight: '500',
            textDecoration: 'underline'
          }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
