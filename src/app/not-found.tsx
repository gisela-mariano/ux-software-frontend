"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

export default function GlobalNotFound() {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen  gap-4">
      <h1 className="title">Page not found</h1>
      <p>The page you are trying to access does not exist.</p>
      <Button label="Return to home page" onClick={goHome} />
    </div>
  );
}
