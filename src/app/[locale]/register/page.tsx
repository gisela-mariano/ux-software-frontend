import { RegisterForm } from "@/components/atoms/registerForm";
import { getTranslations } from "next-intl/server";

export default async function RegisterPage() {
  const t = await getTranslations("components.register");

  return (
    <>
      <main className="w-full flex justify-center">
        <div className="m-8 w-lg">
          <h1 className="mb-4 text-(--text-color) font-bold text-4xl">{t("title")}</h1>

          <RegisterForm />
        </div>
      </main>
    </>
  );
}
