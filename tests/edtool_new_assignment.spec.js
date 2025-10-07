import {test, expect} from '@playwright/test';

test('Test utworzenia assignmentu', async ({ page }) => {


  // Krok 1. Wejście i logowanie na stronę
  await page.goto('https://app.edtool.com/login/');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+testuser.school@learnetic.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('abcdef123456');
  await page.getByRole('button', { name: 'Sign in' }).click();


  // Krok 2. Utworzenie assignmentu z pierwszej lekcji na górze
    

        await page.getByRole('link', { name: 'My Content' }).click();
        // zidentykowanie kart lekcji bez konkretnego ID
        const lessonCards = page.locator('[data-testid^="lesson-card/"]');

        //Wybieranie pierwszego elementu z listy
        const firstLessonCard = lessonCards.first();

        // Sprawdzenie czy element jest widoczny
        await expect(firstLessonCard).toBeVisible();

        // Kliknięcie w pierwszą kartę (lub inna akcja)
        await firstLessonCard.getByRole('button', { name: 'Assign' }).click();
        
        // Zdefiniowanie unikalnej nazwy assignmentu
        const timeStamp = Date.now();
        const dateObject = new Date(timeStamp);
        const readableDate = dateObject.toLocaleString('pl-PL', 
            {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Zapewnia format 24-godzinny
            });

            const cleanDate = readableDate.replace(/[\.\s:]/g, '_').replace(/,/g, '')
            const AssignmentName = `Assignment_${cleanDate}`;
        
        
        // Nazwanie assignmentu
                await page.getByRole('textbox', { name: 'Title' }).click();
        await page.getByRole('textbox', { name: 'Title' }).fill(AssignmentName);
        
        // Wybranie assignmentu jako publiczny
        await page.getByRole('button', { name: 'Public' }).click();
        await page.getByRole('option', { name: 'Public' }).click();
        await page.getByRole('button', { name: 'ASSIGN' }).click();
        await expect(page.getByText(AssignmentName)).toBeVisible();
        console.log(`Utworzony assignment: ${AssignmentName}`);
});
  

