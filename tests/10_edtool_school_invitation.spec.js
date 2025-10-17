import {test, expect} from '@playwright/test';

test('Test zaprosznia ucznia do szkoły', async ({ page }) => {

// Krok 1. Zalogowanie na nauczyciela
  await page.goto('https://app.edtool.com/login/');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+testuser.school@learnetic.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('abcdef123456');
  await page.getByRole('button', { name: 'Sign in' }).click();

// Krok 2. Zaproszenie ucznia do szkoły
  await page.getByRole('link', { name: 'My School' }).click();
  await page.getByRole('button', { name: 'Invite students' }).click();
  await page.getByRole('textbox', { name: 'Type students emails and' }).click();
  await page.getByRole('textbox', { name: 'Type students emails and' }).fill('agnieszka.podwojewska+testuser.student@learnetic.com');
  await page.getByRole('button', { name: 'Invite students' }).click();

// Krok 3. Wylogowanie się z konta
  await page.getByRole('button', { name: 'Open user menu' }).click();
  await page.getByRole('menuitem', { name: 'Sign out' }).click();

// Krok 4. Zalogowanie się na konto zaproszonego ucznia
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+testuser.student@learnetic.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('abcdef123456');
  await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Przejście do zakładki Szkoły i zaakceptowanie zaproszenia
    await page.getByRole('link', { name: 'My School' }).click();
    await page.waitForLoadState('networkidle')
    await expect(page.getByText('Teacher invited you to his')).toBeVisible();
    // Sprawdzenie czy zaakceptowana szkoła pojawiła się na liście
    await page.getByRole('button', { name: 'Accept' }).click();
    await expect(page.getByText('School').nth(1)).toBeVisible();
   
    // wylogowanie się ucznia
    await page.getByRole('button', { name: 'Open user menu' }).click();
    await page.getByRole('menuitem', { name: 'Sign out' }).click();
   

    // Zalogowanie się ponownie nauczyciela
   await page.goto('https://app.edtool.com/login/');
   await page.getByRole('textbox', { name: 'Email address' }).click();
   await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+testuser.school@learnetic.com');
   await page.getByRole('textbox', { name: 'Password' }).click();
   await page.getByRole('textbox', { name: 'Password' }).fill('abcdef123456');
   await page.getByRole('button', { name: 'Sign in' }).click();
  

// Krok 6. Oczyszczenie środowiska - usunięcie dodanego ucznia i nauczyciela

   // Usunięcie ucznia
   await page.getByRole('link', { name: 'My School' }).click();
   await page.getByRole('button', { name: 'Students', exact: true }).click();
   await page.getByRole('button', { name: 'Remove student' }).click();
   await page.getByRole('button', { name: 'Delete' }).click();

      // Usunięcie nauczyciela
   await page.getByRole('link', { name: 'My School' }).click();
   await page.getByRole('button', { name: 'Teachers', exact: true }).click();
   await page.getByRole('button', { name: 'Remove teacher' }).click();
   await page.getByRole('button', { name: 'Delete' }).click();

});


