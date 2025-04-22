// useWebSocket.js
import { useEffect, useRef } from 'react';

 function useWebSocket(url, onMessage, onOpen, onClose, onError) {
  const socketRef = useRef(null);

  useEffect(() => {
    // Créer la connexion
    socketRef.current = new WebSocket(url);

    // Configurer les écouteurs d'événements
    if (onOpen) socketRef.current.onopen = onOpen;
    if (onMessage) socketRef.current.onmessage = onMessage;
    if (onClose) socketRef.current.onclose = onClose;
    if (onError) socketRef.current.onerror = onError;

    // Nettoyage quand le composant est démonté
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url]);

  // Fonction pour envoyer des messages
  const sendMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return { sendMessage };
}
export default useWebSocket;