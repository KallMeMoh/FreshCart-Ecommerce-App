"use server";
import { BadRequestError } from "@/errors/RequestErrors";
import { RegisterSchemaType } from "@/schema/register.schema";
import { Playball } from "next/font/google";
import { success } from "zod";

export default async function signUp(fields: RegisterSchemaType) {
  try {
    const res = await fetch(`${process.env.API_BASEURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    if (!res.ok)
      throw new BadRequestError(
        "A server error occurred while registering your account."
      );

    const payload = await res.json();
    console.log(payload);

    return {
      success: true,
      error: null,
    };
  } catch (e: unknown) {
    if (e instanceof BadRequestError) {
      return {
        success: false,
        error: {
          message: e.message,
          type: e.name,
        },
      };
    } else {
      console.error("Unexpected error: ", e);
      return {
        success: false,
        error: {
          message: "An unexpected error occurred. Please try again.",
          type: "UnknownError",
        },
      };
    }
  }
}
