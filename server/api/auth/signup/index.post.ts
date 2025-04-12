import bcrypt from "bcryptjs";
import { getAuthUser } from "~/server/services/auth-service";
import { prisma } from "~/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);

  const { name, lastName, email, roleId, birth, password } = await readBody(
    event
  );

  const role = await prisma.role.findUnique({
    where: {
      id: parseInt(roleId),
    },
  });

  if (!role) {
    throw createError({
      statusCode: 404,
      message: "Role not found",
    });
  }

  // Input validation
  if (!name || !email || !password || !lastName || !roleId || !birth) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
        roleId,
        birth: new Date(birth),
      },
    });

    return {
      user,
    };
  } catch (error: any) {
    // Handle database errors
    if (error.code === "P2002") {
      throw createError({
        statusCode: 400,
        message: "Email already registered",
      });
    }
    throw error;
  }
});
