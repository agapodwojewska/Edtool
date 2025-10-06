import { test, expect } from '@playwright/test';

test('Test niepoprawnego logowania', async ({ page }) => {
  await page.goto('https://app.edtool.com/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+lertic.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('abcdef123456');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByText('Email is not valid').click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+testuser@lertic.com');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.locator('div').filter({ hasText: /^Email addressWrong credentials$/ }).getByRole('paragraph').click();
  await page.locator('div').filter({ hasText: /^PasswordWrong credentials$/ }).getByRole('paragraph').click();
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+testuser@learnetic.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('abcdef12345');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.locator('div').filter({ hasText: /^Email addressWrong credentials$/ }).getByRole('paragraph').click();
  await page.locator('div').filter({ hasText: /^PasswordWrong credentials$/ }).getByRole('paragraph').click();
});