import bcrypt from "bcryptjs";
import { getAuthUser } from "~/server/services/auth-service";
import { prisma } from "~/server/services/prisma-service";

export default defineEventHandler(async (event) => {
  await getAuthUser(event);

  const { name, lastName, email, roleId, birth, password } = await readBody(
    event
  );

  const id = parseInt(getRouterParam(event, "id") as string);

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
  if (!id || !name || !email || !lastName || !roleId || !birth) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: {
          not: id,
        },
      },
    });

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: "Este e-mail já está em uso por outro usuário.",
      });
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    // Create new user
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        lastName,
        email,

        ...(password && {
          password: hashedPassword,
        }),
        roleId,
        birth: new Date(birth),
      },
    });

    return {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      roleId: user.roleId,
      birth: new Date(user.birth),
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
