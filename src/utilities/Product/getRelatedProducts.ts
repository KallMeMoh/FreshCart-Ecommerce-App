"use server";
import { BadRequestError } from "@/errors/RequestErrors";
import { ProductType } from "@/types/product.type";

export default async function getRelatedProducts(
  productId: string,
  categoryId: string
) {
  try {
    const res = await fetch(
      `${process.env.API_BASEURL}/products?limit=5&category=${categoryId}`
    );

    if (!res.ok)
      throw new BadRequestError(
        "A server error occurred while loading related products"
      );

    const payload = await res.json();
    if (payload.statusMsg === "fail") throw new Error(payload.message);

    return {
      success: true,
      payload: payload.data.filter(
        (product: ProductType) => product._id !== productId
      ),
      error: null,
    };
  } catch (e: unknown) {
    if (e instanceof BadRequestError) {
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
