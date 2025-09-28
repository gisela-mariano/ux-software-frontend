import { LoginForm } from "@/components/atoms/loginForm";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("components.login");

  return (
    <>
      <main className="w-full flex justify-center">
        <div className="m-8 w-lg">
          <h1 className="mb-4 text-(--text-color) font-bold text-4xl">{t("title")}</h1>

          <LoginForm />
        </div>
      </main>
    </>
  );
}
