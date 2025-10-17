import { test, expect } from '@playwright/test';

test('Test skopiowania lekcji do nowego folderu', async ({ page }) => {
  
// Krok 1. Zalogowanie się na testowego użytkownika
  await page.goto('https://app.edtool.com/login/');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('agnieszka.podwojewska+testuser.school@learnetic.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('abcdef123456');
  await page.getByRole('button', { name: 'Sign in' }).click();


// Krok 2. Utworzenie nowej lekcji (bo zakładamy czyste środowisko)
  await page.getByRole('link', { name: 'My Content' }).click();
  await page.getByTestId('add-lesson-button').click();
  await page.locator('.rounded-md.font-semibold.disabled\\:cursor-not-allowed.disabled\\:opacity-50.disabled\\:text-white.text-base.text-white.bg-primary-600.hover\\:bg-primary-500.flex.h-8.w-8.items-center.justify-center.px-0.py-0.disabled\\:bg-gray-700.m-0').click();

  // Krok 3. Dodanie pierwszej lekcji z listy do ulubionych
  
  
    // Zdefiniowanie wszystkich kart lekcji
    const allLessonCards = page.getByTestId(/lesson-card\/.*/i);
    // Wybranie pierwszej karty z listy pasujących elementów.
    const firstLessonCard = allLessonCards.first(); 
    // W kontekście tej pierwszej karty (firstLessonCard) lokalizujemy tekst 'New lesson'.
    const newLessonText = firstLessonCard.getByText('New lesson');
    // Dodanie pierwszej karty z listy do ulubionych
    await firstLessonCard.getByRole('button', { name: 'Add to the Favorites' }).click();
    await page.getByRole('button', { name: 'Favorites', exact: true }).click();
    
    // await expect.getByRole('text', { name: 'New lesson' }).toBeVisible();

// Krok 4. Dodanie pierwszej lekcji z listy do Playlists
    
        //Był problem z zdefiniowaniem Playlists z menu, w związku z tym skorzystano z rodzica tak żeby szukał przycisku tylko w danym miejscu
        const menuList = page.locator('#__next > div > div > main > div > ul'); 

        // Użyj getByRole W KONTEKŚCIE tego LOKATORA
        // Teraz szukamy przycisku "Playlists" TYLKO wewnątrz elementu menuList.
        await menuList.getByRole('button', { name: 'Playlists' }).click();
   
   
    await page.getByTestId('add-playlist-button').click();
    await page.getByTestId('add-lesson-to-favorites-button').click();
    await firstLessonCard.getByRole('button', { name: 'Add to the Playlist' }).click();
    await page.getByRole('menuitem', { name: 'New playlist' }).click();
    await menuList.getByRole('button', { name: 'Playlists' }).click();


// Krok 5. Usunięcie lekcji z favorites i playlists
    
// usunięcie z playlists
   await page.locator('button:has(path[d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"])').nth(0).click();
    await page.getByRole('button', { name: 'YES' }).click();
    
 // usunięcie z Favourites   
    await page.getByRole('button', { name: 'Favorites', exact: true }).click();
    await page.locator('button:has(path[d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"])').nth(0).click();
    await page.getByRole('button', { name: 'Save changes' }).click();

   

});