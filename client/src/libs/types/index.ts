export type Notification = {
  message: string;
  status: number;
};

export type NotificationsProps = { data: Array<Notification> };
