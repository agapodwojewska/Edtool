  import {test, expect} from '@playwright/test';

  
  test('Test utworzenia klasy i zaproszenia ucznia', async ({ page }) => {
  
// Krok 1. Wejście i logowanie na stronę
  await page.goto('https://app.edtool.com/login/');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+testuser.school@learnetic.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('abcdef123456');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('link', { name: 'My School' })).toBeVisible({ timeout: 10000});
// Krok 2. Przejście do zakładki My School -> Create class i utworzenie Klasy z unikalną nazwą

    // ustalenie znacznika czasu dla nowoutworzonej klasy
     const timeStamp = Date.now();
     const dateObject = new Date(timeStamp);
     const readableDate = dateObject.toLocaleString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Zapewnia format 24-godzinny
     });

    const cleanDate = readableDate.replace(/[\.\s:]/g, '_').replace(/,/g, '')
     
    // Określenie unikalnej nazwy tworzonej klasy
     const ClassName = `Testowa_Klasa_${cleanDate}`;

    // Utworzenie klasy i nadanie nazwy
     await page.getByRole('link', { name: 'My School' }).click();
     await expect(page.getByRole('button', { name: 'Create class' })).toBeVisible();
     await page.getByRole('button', { name: 'Create class' }).click();
     await page.getByPlaceholder('Class 3B').click();
     await page.getByPlaceholder('Class 3B').fill(ClassName);
     await page.getByTestId('add-group-button').click();
     
     
    // Krok 3. Skopiowanie utworzonego kodu dla nowoutworzonej lekcji
    
    // zdefiniowanie zmiennej 
    let accessCode = null;
     await page.pause()
     // zdefiniowanie odpowiedniego access kodu dla nowoutworzonej lekcji. Wyszukanie komórki (td) z nazwą nowoutworzonej klasy, następnie cofnięcie się do parenta komórki i odnalezienie w drugiej komórce wiersza kodu
    const accessCodeLocator = page.locator(`//td[text()='${ClassName}']/parent::tr/td[2]//span`);
    
    // określenie buttonu > jako następny
    const nextButton = page.getByRole('navigation', { name: 'Pagination' }).getByRole('button').last(); 

     // --- Pętla Paginacji ---
    while (accessCode === null) {
        
        // Czekamy na unikalną nazwę klasy (dzięki czemu Playwright od razu widzi, czy element jest na stronie)
        const isClassVisible = await accessCodeLocator.isVisible({ timeout: 1000 });
        
        if (isClassVisible) {
            // Pobieramy kod i wychodzimy z pętli
            accessCode = await accessCodeLocator.innerText();
            break;
        }

        // 2. Jeśli nie znaleziono, sprawdzamy, czy możemy przejść dalej.
        try {
        // Oczekiwanie na to, że przycisk BĘDZIE AKTYWNY w ciągu 5 sekund.
        // Jeśli przycisk pozostaje nieaktywny przez 5 sekund, to zakładamy, że to KONIEC
        await expect(nextButton).toBeEnabled({ timeout: 5000 }); 
    
        // Jeśli asercja przeszła (przycisk jest AKTYWNY), klikamy i kontynuujemy pętlę
        await nextButton.click();
    
        } catch (error) {
        // Jeśli asercja zawiodła (przycisk jest DEZAKTYWOWANY i nie zmienił stanu przez 5s)
        // to zakładamy, że jest to koniec paginacji i rzucamy błąd, że elementu nie znaleziono.
        throw new Error(`Błąd: Klasa o nazwie '${ClassName}' nie została znaleziona na żadnej stronie. Przycisk 'Następna' pozostał nieaktywny.`);
}
    }
    // --- Weryfikacja i Logowanie Wyniku ---
    
    // Ostateczna asercja: upewniamy się, że kod został faktycznie pobrany (nie jest nullem)
    await expect(accessCode).not.toBeNull();


    // sprawdzenie czy pobrany accessCode ma poprawny format
    await expect(accessCode).toMatch(/^[A-Z0-9]{8}$/);
    console.log(`Pobrany kod dostępu dla klasy ${ClassName}: ${accessCode}`);
  });