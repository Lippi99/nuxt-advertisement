export function useStripe() {
  const checkout = async () => {
    // 2
    const res = await $fetch<{ url: string }>(
      "/api/stripe/create-checkout-session",
      {
        method: "POST",
      }
    );

    if (res) {
      // 3
      await navigateTo(res.url, {
        external: true,
      });
    }
  };

  const navigateToStripeDashboard = async () => {
    const res = await $fetch("/api/stripe/create-portal-session", {
      method: "POST",
    });

    if (res && "url" in res) {
      await navigateTo(res.url, {
        external: true,
      });
    } else {
      console.error("Error creating portal session:", res.error);
    }
  };

  return { checkout, navigateToStripeDashboard };
}
