import { User } from "@prisma/client";
import { Request } from "express";

export type AuthenticatedRequest = Request & {
    user: Pick<User, "id" | "email">
}