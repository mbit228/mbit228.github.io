import { test, expect } from '@playwright/test';

const settings = {
  screenshot: {
    type: 'jpeg',
    quality: 70,
    fullPage: true,
  },
  viewport: {
    width: 1200,
    height: 680,
  },
};

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080');
  await page.setViewportSize(settings.viewport);
});

test('step1', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'l2-responsive-layout-v1' })).toBeVisible();
});

test('step2', async ({ page }) => {
  const table = await page.getByRole('table');
  await expect(page.getByRole('cell', { name: 'Account' })).toBeVisible();
  await expect(table.getByRole('cell', { name: 'Visa - 3412' })).toBeVisible();
  await expect(table.getByRole('cell', { name: '$2,443' })).toBeVisible();
  await expect(table.getByRole('cell', { name: 'Visa - 6076' })).toBeVisible();
  await expect(page.locator('tr')).toHaveCount(4);
});

test('step3', async ({ page }) => {
  await page.setViewportSize({ width: 649, height: 820 });

  const template = await page
    .locator('html')
    .screenshot(settings.screenshot);

  expect(template).toMatchSnapshot();
});

test('step4', async ({ page }) => {
  await page.setViewportSize({ width: 449, height: 820 });

  const template = await page
    .locator('html')
    .screenshot(settings.screenshot);

  expect(template).toMatchSnapshot();
});
