import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { authUser, token } = useAuthContext();

  useEffect(() => {
    const getConversations = async () => {
      if (!token) {
        toast.error("No token provided");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (authUser && token) {
      getConversations();
    } else {
      console.log("No authUser or token, skipping conversation fetch");
    }
  }, [authUser, token]);

  return { loading, conversations };
};

export default useGetConversations;
