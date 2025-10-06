import { test, expect } from '@playwright/test';

test('Test poprawnego zalogowania na stronę', async ({ page }) => {
  await page.goto('https://app.edtool.com/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+testuser@learnetic.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('abcdef123456');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('img', { name: 'Learnetic' }).click();
  await page.getByRole('button', { name: 'Open user menu' }).click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();
});