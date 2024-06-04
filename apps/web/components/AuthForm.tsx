"use client";

import { Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useState } from "react";

interface AuthFormProps {
  type: "login" | "register";
}

const titles = {
  login: "Login",
  register: "Register",
};

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;
    const url = `/api/authentication/${type}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });
      if (!response.ok) {
        const text = await response.text();
        setError(text);
        return;
      }
      if (type === "login") {
        document.cookie = "loggedIn=true";
        startTransition(() => {
          router.refresh();
          router.push("/");
        });
      } else {
        setError("You can now login");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h4">{titles[type]}</Typography>
      <TextField label="Email" type="email" name="email" required />
      <TextField label="Password" type="password" name="password" required />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit">Ok</Button>
    </form>
  );
};

export default AuthForm;
