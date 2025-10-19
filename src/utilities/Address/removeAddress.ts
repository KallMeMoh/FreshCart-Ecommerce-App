"use server";
import getLoggedUserToken from "@/utilities/getLoggedUserToken";
import { UnauthorizedError } from "@/errors/AuthErrors";
import { BadRequestError } from "@/errors/RequestErrors";

export default async function removeAddress(addressId: string) {
  try {
    const token = await getLoggedUserToken();

    if (!token) throw new UnauthorizedError("You must login first!");

    const res = await fetch(
      `${process.env.API_BASEURL}/addresses/${addressId}`,
      {
        method: "DELETE",
        headers: {
          token,
        },
      }
    );

    if (!res.ok)
      throw new BadRequestError(
        "A server error occurred while removing address data"
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
