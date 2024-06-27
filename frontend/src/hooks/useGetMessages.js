import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("chat-token");
        if (!token) {
          throw new Error("Unauthorized - No Token Provided");
        }

        const res = await fetch(
          `http://localhost:8000/api/messages/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized - Invalid Token");
          } else {
            throw new Error(data.error);
          }
        }
        setMessages(data);
      } catch (error) {
        if (error.message.includes("Unauthorized")) {
          toast.error("Please log in again to view messages.");
        } else {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
