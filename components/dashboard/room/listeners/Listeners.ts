import useChatStore from "@/store/room/useChatStore";
import { useCallback } from "react";

export const useIncomingMessageHandler = () => {
    const chatStore = useChatStore();
  
    const handleIncomingMessage = useCallback((data: any) => {
      chatStore.addChatMessage(data);
    }, [chatStore]);
  
    return handleIncomingMessage;
  };