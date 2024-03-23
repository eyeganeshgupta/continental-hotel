"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const LinkButton = ({ title, path }: { title: string; path: string }) => {
  const router = useRouter();
  return <Button onClick={() => router.push(path)}>{title}</Button>;
};

export default LinkButton;
