// server/api/auth/logout.post.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "~/server/services/db";

interface AuthTokenPayload extends JwtPayload {
  userId: number;
}

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

    const userResult = await pool.query(`SELECT id FROM "user" WHERE id = $1`, [
      decoded.userId,
    ]);

    if (userResult.rowCount === 0) {
      throw createError({
        statusCode: 404,
        message: "User not found",
      });
    }

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
