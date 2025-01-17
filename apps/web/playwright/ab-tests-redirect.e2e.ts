import { expect } from "@playwright/test";

import { test } from "./lib/fixtures";

test.describe.configure({ mode: "parallel" });

test.describe("apps/ A/B tests", () => {
  test("should point to the /future/apps/[slug]", async ({ page, users, context }) => {
    await context.addCookies([
      {
        name: "x-calcom-future-routes-override",
        value: "1",
        url: "http://localhost:3000",
      },
    ]);
    const user = await users.create();

    await user.apiLogin();

    await page.goto("/apps/telegram");

    await page.waitForLoadState();

    const dataNextJsRouter = await page.evaluate(() =>
      window.document.documentElement.getAttribute("data-nextjs-router")
    );

    expect(dataNextJsRouter).toEqual("app");

    const locator = page.getByRole("heading", { name: "Telegram" });

    await expect(locator).toBeVisible();
  });

  test("should point to the /future/apps/[slug]/setup", async ({ page, users, context }) => {
    await context.addCookies([
      {
        name: "x-calcom-future-routes-override",
        value: "1",
        url: "http://localhost:3000",
      },
    ]);
    const user = await users.create();

    await user.apiLogin();

    await page.goto("/apps/apple-calendar/setup");

    await page.waitForLoadState();

    const dataNextJsRouter = await page.evaluate(() =>
      window.document.documentElement.getAttribute("data-nextjs-router")
    );

    expect(dataNextJsRouter).toEqual("app");

    const locator = page.getByRole("heading", { name: "Connect to Apple Server" });

    await expect(locator).toBeVisible();
  });
});
