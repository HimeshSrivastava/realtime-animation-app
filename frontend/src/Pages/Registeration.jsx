import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthContex } from "../contex/AuthContex";
import { BACKEND_URL } from "../constants/api";

const Registration = () => {
  const nameref = useRef(null);
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const confirmpasswordref = useRef(null);
  const genderref = useRef(null);

  const { setAuthUser } = useAuthContex();

  const handleBackend = async () => {
    try {
      const user = {
        name: nameref.current.value,
        email: emailref.current.value,
        password: passwordref.current.value,
        ConfirmPassword: confirmpasswordref.current.value,
        gender: genderref.current.value,
      };

      const result = await axios.post(`${BACKEND_URL}/api/auth/signup`, user);

      localStorage.setItem("chat-User", JSON.stringify(result.data));
      setAuthUser(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
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
        width: '100%',
        maxWidth: '42rem',
        margin: '0 auto',
        backgroundColor: 'rgba(226, 232, 240, 0.85)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        borderRadius: '0.5rem',
        padding: '1.5rem'
      }}>
        <div style={{ width: '100%' }}>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            color: '#1e3a8a',
            marginBottom: '1rem'
          }}>Create an Account</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Name */}
            <div>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>Name</label>
              <input
                ref={nameref}
                type="text"
                placeholder="Enter your full name"
                required
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>Email</label>
              <input
                ref={emailref}
                type="email"
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>Password</label>
              <input
                ref={passwordref}
                type="password"
                placeholder="Enter your password"
                required
                style={{
                 width: '100%',
                  padding: '0.55rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>Confirm Password</label>
              <input
                ref={confirmpasswordref}
                type="password"
                placeholder="Confirm your password"
                required
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Gender */}
            <div>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>Gender</label>
              <select
                ref={genderref}
                required
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  outline: 'none'
                }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Agreement */}
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
              <input type="checkbox" required />
              <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                I agree to the processing of personal data
              </p>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleBackend}
              style={{
                width: '100%',
                padding: '0.55rem',
                backgroundColor: '#2563eb',
                color: 'white',
                borderRadius: '0.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Create Account
            </button>

            {/* Login Redirect */}
            <p style={{
              fontSize: '0.875rem',
              color: '#4b5563',
              textAlign: 'center'
            }}>
              Already have an account?{" "}
              <Link to="/login" style={{
                color: '#2563eb',
                textDecoration: 'underline'
              }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
