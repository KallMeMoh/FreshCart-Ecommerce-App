"use server";

export default async function verifyCode(
  { code, newPassword }: { code: string; newPassword: string },
  { email }: { email: string }
) {
  try {
    const resestRes = await fetch(
      `${process.env.API_BASEURL}/auth/verifyResetCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetCode: code }),
      }
    );

    if (!resestRes.ok) throw new Error("Failed to verify reset code!");

    const { statusMsg, message } = await resestRes.json();
    if (statusMsg === "fail") throw new Error(message);

    const updateRes = await fetch(
      `${process.env.API_BASEURL}/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      }
    );
    if (!updateRes.ok) throw new Error("Failed to update password!");

    const payload = await updateRes.json();
    if (payload.statusMsg === "fail") throw new Error(payload.message);

    return {
      success: true,
      payload: !!payload.token,
      error: null,
    };
  } catch (e) {
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
