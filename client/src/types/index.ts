import {
  initialEmailSignUpForm,
  initialEmailSignUpHint,
} from "@/app/components/emailSignUpForm";
import { z } from "zod";

export const NotificationSchema = z.object({
  message: z.string(),
  status: z.number(),
});

export type Notification = z.infer<typeof NotificationSchema>;

export type NotificationsProps = { data: Array<Notification> };

export type InitialEmailSignUpForm = typeof initialEmailSignUpForm;

export type InitialEmailSignUpHint = typeof initialEmailSignUpHint;

export type InitialEmailSignUpFormFocus =
  | "name"
  | "email"
  | "confirmation"
  | "password";

export type Account = {
  email: string;
  id: string;
  password: string;
  name: string;
};
