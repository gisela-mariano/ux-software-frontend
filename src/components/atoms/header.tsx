"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { logout as authLogout } from "@/lib/auth";
import { useAuthStore } from "@/stores";
import { useCartStore } from "@/stores/cartStore";
import { UserRoles } from "@/types";
import { Toast, ToastHandle } from "@components/atoms/toast";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useRef, useState } from "react";

export const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const t = useTranslations();
  const locale = useLocale();

  const { locales } = routing;

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.role);
  const storeLogout = useAuthStore((state) => state.logout);
  const cartProductQuantity = useCartStore((state) => state.cartProductQuantity);
  const setCartProductQuantity = useCartStore((state) => state.setCartProductQuantity);
  const storeUpdateCartProductQuantity = useCartStore((state) => state.updateCartProductQuantity);

  const [isMounted, setIsMounted] = useState(false);

  const toastRef = useRef<ToastHandle>(null);

  const handleCartRedirect = async () => {
    if (!isAuthenticated) {
      toastRef.current?.show({
        summary: t("toast.summary.error"),
        detail: t("toast.message.error.cantAccessCartPage"),
      });

      return;
    }

    router.push("/cart");
  };

  const handleLogout = async () => {
    await authLogout();
    storeLogout();
    setCartProductQuantity(0);

    router.push("/");
  };

  const renderAuthButton = () => {
    if (!isMounted) return null;

    if (!isAuthenticated && !pathName.includes("/login")) {
      return <Button label={t("buttons.login")} onClick={() => router.push("/login")} />;
    }

    if (isAuthenticated && !(pathName.includes("/login") || pathName.includes("/register"))) {
      return <Button label={t("buttons.logout")} onClick={handleLogout} />;
    }

    return null;
  };

  useEffect(() => {
    setIsMounted(true);

    const updateCartProductQuantity = async () => {
      if (isAuthenticated) await storeUpdateCartProductQuantity();
    };

    updateCartProductQuantity();
  }, [isAuthenticated, storeUpdateCartProductQuantity]);

  return (
    <>
      <Toast ref={toastRef} severity="error" />

      <header className="flex justify-between items-center p-4 bg-(--primary-color) text-gray-50">
        <div className="flex items-center gap-6">
          <Link href="/">
            <h1 className="text-2xl font-bold">NextStore</h1>
          </Link>

          <nav>
            <ul className="flex items-center gap-2">
              <li>
                <Link href="/products">{t("components.products.title")}</Link>
              </li>

              {isMounted && userRole === UserRoles.ADMIN && (
                <li>
                  | <Link href="/admin/add/products">{t("components.addProducts.title")}</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="flex gap-5 items-center">
          <Button
            icon="pi pi-shopping-cart"
            rounded
            badge={cartProductQuantity.toString()}
            onClick={handleCartRedirect}
          />

          {renderAuthButton()}

          <Dropdown
            value={locale}
            onChange={(e) => router.replace(pathName, { locale: e.value })}
            options={locales.map((locale) => locale)}
          />
        </div>
      </header>
    </>
  );
};
