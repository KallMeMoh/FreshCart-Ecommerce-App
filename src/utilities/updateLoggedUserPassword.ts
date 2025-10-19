"use server";
import { BadRequestError } from "@/errors/RequestErrors";
import getLoggedUserToken from "./getLoggedUserToken";
import { UnauthorizedError } from "@/errors/AuthErrors";

export default async function updateLoggedUserPassword(values: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  try {
    const token = await getLoggedUserToken();

    if (!token) throw new UnauthorizedError("You must login first!");

    const res = await fetch(
      `${process.env.API_BASEURL}/users/changeMyPassword`,
      {
        method: "PUT",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (!res.ok)
      throw new BadRequestError(
        "A server error occurred while updating user password"
      );

    const payload = await res.json();
    if (payload.statusMsg === "fail")
      throw new UnauthorizedError(
        payload.message.replace("Token", "credentials")
      );

    return {
      success: true,
      payload,
      error: null,
    };
  } catch (e: unknown) {
    if (e instanceof UnauthorizedError || e instanceof BadRequestError) {
      return {
        success: false,
        payload: null,
        error: {
          message: e.message,
          type: e.name,
        },
      };
    } else {
      console.error("Unexpected error: ", e);
      return {
        success: false,
        payload: null,
        error: {
          message: "An unexpected error occurred. Please try again.",
          type: "UnknownError",
        },
      };
    }
  }
}
