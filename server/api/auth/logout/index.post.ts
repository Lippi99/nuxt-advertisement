import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthTokenPayload extends JwtPayload {
  userId: number;
}

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    const token = getCookie(event, "ad-auth");
    if (!token) {
      throw createError({
        statusCode: 401,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, config.jwtSecret) as AuthTokenPayload;
    await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    setCookie(event, "ad-auth", "", {
      maxAge: -1,
      path: "/",
      httpOnly: true,
    });

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    console.error("Logout error:", error);
    throw createError({
      statusCode: 500,
      message: "Error during logout",
    });
  }
});
