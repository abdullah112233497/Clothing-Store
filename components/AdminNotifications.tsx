"use client";

import { useState } from "react";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "order" | "stock" | "customer";
};

const notifications: Notification[] = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #1024 worth Rs. 6,999 has been placed.",
    time: "5 min ago",
    type: "order",
  },
  {
    id: 2,
    title: "Low Stock Alert",
    message: "Modern Cargo Pants has only 2 items left.",
    time: "18 min ago",
    type: "stock",
  },
  {
    id: 3,
    title: "New Customer",
    message: "Sara Ahmed has created a new account.",
    time: "1 hour ago",
    type: "customer",
  },
];

function BellIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function OrderIcon() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f1e4d5] text-[#9a6935]">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2h12v20H6z" />
        <path d="M9 6h6M9 10h6M9 14h4" />
      </svg>
    </div>
  );
}

function StockIcon() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff1dc] text-[#b7791f]">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3 2.8 8 12 13l9.2-5L12 3Z" />
        <path d="M2.8 12 12 17l9.2-5" />
        <path d="M2.8 16 12 21l9.2-5" />
      </svg>
    </div>
  );
}

function CustomerIcon() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f2ed] text-[#39735a]">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="3" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </svg>
    </div>
  );
}

function NotificationTypeIcon({
  type,
}: {
  type: Notification["type"];
}) {
  if (type === "order") return <OrderIcon />;
  if (type === "stock") return <StockIcon />;
  return <CustomerIcon />;
}

export default function AdminNotifications() {
  const [open, setOpen] = useState(false);

  // IDs of notifications that have been read
  const [readNotifications, setReadNotifications] = useState<number[]>(
    []
  );

  const unreadCount =
    notifications.length - readNotifications.length;

  const markAsRead = (id: number) => {
    setReadNotifications((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  };

  const markAllAsRead = () => {
    setReadNotifications(notifications.map((notification) => notification.id));
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#e7ddd2] bg-white text-[#4b4038] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#cbb49b] hover:bg-[#faf7f2] hover:shadow-md"
      >
        <BellIcon />

        {/* Unread Count */}
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full border-2 border-white bg-[#a06e31] px-1 text-[9px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {open && (
        <div className="absolute right-0 top-14 z-50 w-[360px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-[#e7ddd2] bg-white shadow-[0_20px_60px_rgba(60,40,20,0.15)]">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#eee6dd] bg-[#faf7f2] px-5 py-4">
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight text-[#1d1612]">
                Notifications
              </h3>

              <p className="mt-0.5 text-[11px] text-[#8b8179]">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${
                      unreadCount > 1 ? "s" : ""
                    }`
                  : "You are all caught up"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-[11px] font-semibold text-[#a06e31] transition hover:text-[#7d5121]"
                >
                  Mark all read
                </button>
              )}

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[11px] font-medium text-[#8b8179] transition hover:text-[#1d1612]"
              >
                Close
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="max-h-[330px] overflow-y-auto">
            {notifications.map((notification) => {
              const isRead = readNotifications.includes(
                notification.id
              );

              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => markAsRead(notification.id)}
                  className={`group flex w-full gap-3 border-b border-[#f0e9e1] px-5 py-4 text-left transition-colors ${
                    isRead
                      ? "bg-white hover:bg-[#fcfaf7]"
                      : "bg-[#fffaf4] hover:bg-[#fcf5ec]"
                  }`}
                >
                  <NotificationTypeIcon
                    type={notification.type}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`text-[12px] ${
                          isRead
                            ? "font-medium text-[#6f665f]"
                            : "font-semibold text-[#27201b]"
                        }`}
                      >
                        {notification.title}
                      </h4>

                      {!isRead && (
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a06e31]" />
                      )}
                    </div>

                    <p
                      className={`mt-1 text-[11px] leading-5 ${
                        isRead
                          ? "text-[#9a928b]"
                          : "text-[#777069]"
                      }`}
                    >
                      {notification.message}
                    </p>

                    <p className="mt-1.5 text-[10px] font-medium text-[#a39a92]">
                      {notification.time}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-[#eee6dd] bg-[#faf7f2] px-5 py-3 text-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[11px] font-semibold text-[#a06e31] transition hover:text-[#7d5121]"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}