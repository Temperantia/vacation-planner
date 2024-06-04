import { users } from "@repo/db/users";
import { User, UserSchema } from "@repo/validation/authentication";
import { compareSync } from "bcrypt";

const login = async ({ email, password }: User) => {
  try {
    const { resources } = await (
      await users()
    ).items
      .query({
        query: "SELECT * from c WHERE c.email = @email",
        parameters: [{ name: "@email", value: email }],
      })
      .fetchAll();
    const user = resources[0];
    if (!user) {
      return new Response("Wrong password", { status: 401 });
    }
    if (!compareSync(password, user.password)) {
      return new Response("Wrong password", { status: 401 });
    }
    return new Response("User logged in", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const user: User = await request.json();
    UserSchema.parse(user);
    return await login(user);
  } catch {
    return new Response("Invalid user", { status: 400 });
  }
};
