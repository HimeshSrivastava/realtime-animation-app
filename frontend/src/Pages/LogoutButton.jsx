import axios from "axios";
import { useAuthContex } from "../contex/AuthContex";
import { BACKEND_URL } from "../constants/api";

const LogoutButton = () => {
  const { setAuthUser } = useAuthContex();

  const logout = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/logout`);

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      localStorage.removeItem("chat-User");
      setAuthUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <img
        onClick={logout}
        style={{
          width: '2.5rem',    
          height: '2.5rem',   
          marginLeft: '0.5rem', 
          cursor: 'pointer'    
        }}
        src="https://t3.ftcdn.net/jpg/07/02/69/52/240_F_702695255_OTZ8WcZqi89HQmzEeQjvAkXyotlJcheW.jpg"
        alt="logout"
      />
    </div>
  );
};

export default LogoutButton;
