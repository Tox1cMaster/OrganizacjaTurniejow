# OrganizacjaTurniejow
Aplikacja do organizacji turniejow esportowych

```
react dom
react bootstrap
axios
toastify
```

## Jeżeli nie działa w server
```sh
composer update
```
```sh
php artisan jwt:secret
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