# OrganizacjaTurniejow
Aplikacja do organizacji turniejow esportowych

```
react dom
react bootstrap
axios
toastify
```

## Pierwsze uruchomienie
#### Linux
```sh
apt-get install apache2 mysql-server php(i reszta) phpmyadmin 
```
Wymagany PHP, Composer, npm(Najnowszy)
#### Server (Laravel)
```sh
composer install
```
Instaluje wszystkie niezbędne komponenty do serwera

Potrzebny jest plik .env w głównym katalogu /server (Bez niego logowanie JWT nie działa) 
```sh
php artisan jwt:secret
```
Ta komenda generuje klucz JWT jeżeli go nie posiadasz i wrzuca go do ostatniej linijki w pliku .env
Proszę pamiętać, że jezeli masz zapisane hasła z bazą danych użytkowników i chcesz aby hasła działały w innym projekcie, musisz koniecznie przenieść też token JWT! 

W pliku config/database.php nalezy ustawic dane do bazy oraz w .env
```sh
php artisan migrate
```
Migracja struktur bazy do MySQL
```sh
php artisan serve
```
Uruchomienie serwera
#### Klient (Vite/React.js)
```sh
npm install
```

Jakies funkcje w react gdzie będą stosowane w wiecej niz 1 pliku proszę pisać w pliku `/components/Functions.jsx`

## Generowanie testowych danych (server)
#### Tworzy 10 użytkowników
```
php artisan db:seed --class=UsersTableSeeder
```
Hasło lol12345

#### Tworzy turniej (1)
```
php artisan db:seed --class=TournamentsTableSeeder
```
Wytyczne jakie zakresy danych ma generować są w `server/database/seeders`