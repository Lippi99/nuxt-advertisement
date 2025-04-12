import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const config = useRuntimeConfig();

  // In a real app, you'd validate against your database
  // This is just an example

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw createError({
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret as string, {
      expiresIn: 60 * 60 * 24 * 7,
    });

    setCookie(event, "ad-auth", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
      },
    };
  } catch (error) {
    console.log("errror", error);
  }
});
