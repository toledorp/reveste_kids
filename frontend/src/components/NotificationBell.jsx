import { useEffect, useState } from "react";
import "./NotificationBell.css";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const loadNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:4000/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.log("Erro ao carregar notificações:", error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:4000/api/notifications/${notificationId}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );

      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.log(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:4000/api/notifications/read-all", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          read: true,
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.log(error);
    }
  };

  const clearReadNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:4000/api/notifications/clear-read", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications((prev) =>
        prev.filter((notification) => !notification.read)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadNotifications();
    }, 0);

    const interval = setInterval(() => {
      loadNotifications();
    }, 8000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="notification-container">
      <button
        className={`tiktok-action-btn notification-btn ${unreadCount > 0 ? "has-notifications" : ""
          }`}
        onClick={() => setOpen(!open)}
        title="Notificações"
      >
        🔔

        {unreadCount > 0 && (
          <span className="notification-count">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notificações</h3>

            <div className="notification-actions">
              {notifications.length > 0 && (
                <>
                  <button type="button" onClick={markAllAsRead}>
                    Marcar lidas
                  </button>

                  <button type="button" onClick={clearReadNotifications}>
                    Limpar lidas
                  </button>
                </>
              )}
            </div>
          </div>

          {notifications.length === 0 ? (
            <p className="notification-empty">Nenhuma notificação</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`notification-card ${notification.read ? "read" : "unread"
                  }`}
                onClick={() => markAsRead(notification._id)}
              >
                <p>{notification.message}</p>

                <span>
                  {new Date(notification.createdAt).toLocaleString("pt-BR")}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;