"use client";

import { Button } from "antd";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();
  return (
    <Button
      type="link"
      onClick={() => {
        router.push("/sign-in");
      }}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
