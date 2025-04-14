import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "~/server/models/user";
import { requireRole } from "~/server/services/auth-service";
import { prisma } from "~/server/services/prisma-service";

interface AuthTokenPayload extends JwtPayload {
  userId: number;
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const token = getCookie(event, "ad-auth");

  if (!token) {
    throw createError({ statusCode: 401, message: "No token provided" });
  }

  await requireRole(event, ["admin", "employee"]);

  try {
    const decoded = jwt.verify(
      token as string,
      config.jwtSecret
    ) as AuthTokenPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) throw new Error("User not found");

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: user.role.name,
      } as User,
    };
  } catch (e) {
    console.log(e);
  }
});
