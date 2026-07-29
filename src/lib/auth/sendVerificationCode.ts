"use server";

import { BadRequestError } from "@/errors/RequestErrors";

export default async function sendVerificationCode({
  email,
}: {
  email: string;
}) {
  try {
    const res = await fetch(`${process.env.API_BASEURL}/auth/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok)
      throw new BadRequestError(
        "A server error occurred while sending reset code"
      );

    const payload = await res.json();
    if (payload.statusMsg === "fail") throw new Error(payload.message);

    return {
      success: true,
      payload,
      error: null,
    };
  } catch (e: unknown) {
    if (e instanceof Error || e instanceof BadRequestError) {
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
