import { NOTIFICATION_STATUS } from "@/libs/status";
import { Notification, NotificationsProps } from "@/types";
import { Key } from "react";

export const Notifications = ({ data }: NotificationsProps) => {
  return (
    <div className="toast toast-start z-50">
      {data.map((v: Notification, i: Key) => {
        const alertType =
          NOTIFICATION_STATUS[v.status as keyof typeof NOTIFICATION_STATUS];
        return (
          <div key={i} className={`alert ${alertType}`}>
            <span>{v.message}</span>
          </div>
        );
      })}
    </div>
  );
};
