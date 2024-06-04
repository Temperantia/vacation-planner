import { users } from "@repo/db/users";
import { User, UserSchema } from "@repo/validation/authentication";
import { hashSync } from "bcrypt";
import { v4 } from "uuid";

const register = async (user: User) => {
  try {
    user.id = v4();
    user.password = hashSync(user.password, 10);
    await (await users()).items.create(user);
    return new Response("User registered", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const user: User = await request.json();
    UserSchema.parse(user);
    return await register(user);
  } catch {
    return new Response("Invalid user", { status: 400 });
  }
};
