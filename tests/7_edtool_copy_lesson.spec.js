import { test, expect } from '@playwright/test';

test('Test skopiowania lekcji do nowego folderu', async ({ page }) => {
  
// Krok 1. Zalogowanie się na testowego użytkownika
  await page.goto('https://app.edtool.com/login/');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+testuser.school@learnetic.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('abcdef123456');
  await page.getByRole('button', { name: 'Sign in' }).click();
  
// Krok 2. Utworzenie lekcji do skopiowania bez zmiany nazwy lekcji   
  await page.getByRole('link', { name: 'My Content' }).click();
  await page.getByTestId('add-lesson-button').click();
  await page.getByRole('button', { name: 'Text' }).click();
  await page.locator('.rounded-md.font-semibold.disabled\\:cursor-not-allowed.disabled\\:opacity-50.disabled\\:text-white.text-base.text-white.bg-primary-600.hover\\:bg-primary-500.flex.h-8.w-8.items-center.justify-center.px-0.py-0.disabled\\:bg-gray-700.m-0').click();

// Krok 3. Wybranie pierwszej lekcji z góry (ostatnio utworzona)    
    //określamy stałą - karta lessons o ID, które może się zmieniać, czyli tutaj mamy określone wszystkie karty po getByTestId
    // i może ich być bardzo dużo, dlatego musimy określić pierwszą kartę
    const allLessonCards = page.getByTestId(/lesson-card\/.*/i);
    // Wybieramy pierwszą kartę z listy pasujących elementów.
    const firstLessonCard = allLessonCards.first(); 
    // W kontekście tej pierwszej karty (firstLessonCard) lokalizujemy tekst 'New lesson'.
    const newLessonText = firstLessonCard.getByText('New lesson');

    // Asercja: Sprawdzamy, czy ten element jest widoczny.
    await expect(newLessonText).toBeVisible();
    
    // Przykład kliknięcia na ten element w pierwszej karcie:
    // await newLessonText.click();

    // Skopiowanie folderu do pamięci
    await firstLessonCard.getByTestId('context-menu').click();
    await page.getByRole('menuitem', { name: 'Copy lesson' }).click();

// Krok 4. Dodanie nowego folderu i zmiana nazwy
    await page.getByRole('button', { name: 'Add new directory' }).click();
    await page.getByRole('button', { name: 'Edit directory name' }).click();
    await page.getByRole('textbox', { name: 'Use Enter for save' }).click();
    await page.getByRole('textbox', { name: 'Use Enter for save' }).click();
    await page.getByRole('textbox', { name: 'Use Enter for save' }).dblclick();
    await page.getByRole('textbox', { name: 'Use Enter for save' }).fill('New test folder');
  
    // Określenie stałej dla locatora zatwierdzającego zmienianą nazwe folderu 
    const pathLocator = page.locator('path[d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"]');
    await pathLocator.click();
    
    // Sprawdzenie czy lekcja się skopiowała i wkleiła do folderu
    // Oczekujemy, aż folder z tą nazwą przyjmie stan aktywny/wybrany
    await page.getByRole('button', { name: 'Paste lesson' }).nth(1).click();
    await page.getByText('New test folder (1)').click();
    
      await expect(page.getByTestId(/lesson-card\/.*/i).getByText('New lesson')).toBeVisible();
    
    console.log(`Lekcja została prawidłowo skopiowana`);

    // wyczyszczenie środowiska dla kolejnego testu
    await page.getByRole('button', { name: 'Delete directory' }).click();
    await page.getByRole('button', { name: 'Delete', exact: true }).click();
});