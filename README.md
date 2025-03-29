# Instrukcja uruchomienia aplikacji

Hejka! 

Selenium nie daje się tak łatwo spakować do `.exe`, dlatego musisz pobrać i zainstalować **Node.js**.

1. **Instalacja Node.js**
   - Przejdź na stronę [Node.js](https://nodejs.org/en/download) i pobierz wersję odpowiednią dla Twojego systemu operacyjnego.
   
2. **Sprawdzenie instalacji Node.js**
   - Po zainstalowaniu Node.js, otwórz konsolę (np. CMD) i sprawdź, czy wszystko działa, wpisując komendę:
     ```bash
     node -v
     ```
   - Powinna pojawić się wersja Node.js.

3. **Instalacja zależności**
   - Wejdź do folderu aplikacji za pomocą komendy:
     ```bash
     cd tutaj_ścieżka_do_aplikacji
     ```
   - Następnie wykonaj jednorazową instalację zależności:
     ```bash
     npm install
     ```

4. **Uruchomienie aplikacji**
   - Aby uruchomić aplikację, użyj poniższej komendy:
     ```bash
     node bot.js
     ```

5. **Plik konfiguracyjny - `botOptions.json`**
   - W aplikacji znajduje się plik `botOptions.json`, który zawiera zmienne konfiguracyjne.
   - W pliku tym znajdziesz takie zmienne jak:
     - `groups`: Wartość ta zawiera listę grup (po przecinku), do których bot ma dodawać posty. Możesz dodać dowolną liczbę grup, bez limitu.
     - `postText`: Treść tekstowa posta, którą bot wstawi.
     - `imagePath`: Ścieżka absolutna do jednego zdjęcia, które bot dołączy do posta.

   Przykład pliku `botOptions.json`:
   ```json
   {
     "groups": ["https://www.facebook.com/groups/1", "https://www.facebook.com/groups/2"],
     "postText": "To jest tekst posta!",
     "imagePath": "/path/to/image.jpg"
   }
