import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRole } from "~/types/role";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const config = useRuntimeConfig();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createError({
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret as string, {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
    });

    setCookie(event, "ad-auth", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    const role = await prisma.role.findUnique({
      where: { id: user.roleId },
    });

    if (!role) {
      throw createError({
        statusCode: 404,
        message: "Role not found",
      });
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        role: role.name as UserRole,
      },
    };
  } catch (error: any) {
    console.error("Login error:", error);
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});
