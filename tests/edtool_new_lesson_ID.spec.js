import {test, expect} from '@playwright/test';

test('Test utworzenia i edycji lekcji', async ({ page }) => {


  // Krok 1. Wejście i logowanie na stronę
  await page.goto('https://app.edtool.com/login/');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+testuser.school@learnetic.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('abcdef123456');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Krok 2. Przejście na stronę do tworzenia lekcji
  await page.getByRole('link', { name: 'My Content' }).click();
  await page.getByTestId('add-lesson-button').click();

  // Krok 3. Wwyodrębnienie ID nowoutworzonej lekcji do testów
  await page.waitForURL('**/content-editor/**');                        // poczekanie na załadowanie się URL z edytorem tekstu
  const currentUrl = page.url();                                        // pobranie URL
  const match = currentUrl.match(/\/content-editor\/(\d+)(?:\/|$)/);    // wyodrębnienie kawałka ID
  console.log(`Przechwycony URL po utworzeniu lekcji: ${currentUrl}`);  // pokazanie w konsoli przechwyconego kawałka URL aby sprawdzić czy pobiera dobre URL


    // Sprawdzenie, czy ID zostało znalezione
    if (!match) {
        throw new Error("Nie udało się pobrać ID lekcji z adresu URL: " + currentUrl);
    }
    
    const lessonId = match[1]; // match[1] to jest numer, który został przechwycony przez (\d+)
    const unikalnaNazwa = `Testowa_Lekcja_ID_${lessonId}`;



  // Krok 4. dodanie modułu tekstowego do lekcji
  await page.getByRole('button', { name: 'Text' }).click();


    // Zamknięcie lekcji za pomocą elementu svg "X". Brak ID elementu - gdy svg się zmieni to będzie trzeba zaktualizować
    await page.locator('button:has(path[d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"])').click();

  
  // Krok 5: Wyszukanie karty lekcji po unikalnym atrybucie 'data-testid'
  const targetTestId = `lesson-card/${lessonId}`;
  const targetLessonCard = page.getByTestId(targetTestId);
    
    // Oczekujemy, że karta z tym konkretnym ID jest widoczna
    await expect(targetLessonCard).toBeVisible();

    // Rozwinięcie menu kontekstowego dla WŁAŚCIWEJ karty
    await targetLessonCard.getByTestId('context-menu').click();
    await page.getByRole('menuitem', { name: 'Edit details' }).click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(unikalnaNazwa); 
    await page.getByRole('button', { name: 'Update lesson' }).click();
  
    // OWidoczność nowej, unikalnej nazwy na liście
    await expect(page.getByText(unikalnaNazwa)).toBeVisible();
    console.log(`Utworzona lekcja: ${unikalnaNazwa}`);

});




    



