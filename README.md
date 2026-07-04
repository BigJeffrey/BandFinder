# 🎸 BandFinder

## Opis projektu

BandFinder to aplikacja webowa umożliwiająca muzykom znajdowanie zespołów szukających nowych członków oraz zespołom publikowanie ogłoszeń o poszukiwaniu instrumentalistów.

## Cel aplikacji

Celem aplikacji jest stworzenie scentralizowanej platformy łączącej muzyków z zespołami muzycznymi. Aplikacja rozwiązuje problem rozproszonych ogłoszeń muzycznych, które obecnie znajdują się na forach, grupach Facebookowych i tablicach ogłoszeń, oferując ustrukturyzowane wyszukiwanie z filtrami po mieście, gatunku muzycznym i potrzebnym instrumencie.

## Funkcje

- ✅ Rejestracja i logowanie użytkowników (JWT)
- ✅ Dodawanie ogłoszeń o poszukiwaniu muzyków
- ✅ Przeglądanie listy ogłoszeń z paginacją
- ✅ Filtrowanie po mieście, gatunku muzycznym i instrumencie
- ✅ Wyszukiwanie zespołów po nazwie
- ✅ Edycja i usuwanie własnych ogłoszeń
- ✅ Walidacja danych wejściowych
- ✅ Dokumentacja API (Swagger/OpenAPI 3.0)
- ✅ Automatyczny deploy (CI/CD z GitHub Actions)
- ✅ Konteneryzacja (Docker + Docker Compose)

## Technologie

| Komponent | Technologia |
|---|---|
| **Frontend** | React, Vite, React Router, Axios |
| **Backend** | Node.js, Express.js, Prisma ORM |
| **Baza danych** | PostgreSQL 15 |
| **Autoryzacja** | JWT (jsonwebtoken), bcryptjs |
| **Walidacja** | express-validator |
| **Dokumentacja API** | Swagger UI (swagger-ui-express) |
| **Konteneryzacja** | Docker, Docker Compose |
| **CI/CD** | GitHub Actions |
| **Rejestr obrazów** | GitHub Container Registry (GHCR) |
| **Hosting** | Oracle Cloud VPS |
| **Reverse proxy** | Nginx |

## Model danych

### Tabela `User`

| Pole | Typ | Opis |
|---|---|---|
| id | Integer (PK) | Unikalny identyfikator |
| email | String (UNIQUE) | Adres email |
| password | String | Zahashowane hasło |
| name | String | Imię/nick |
| createdAt | DateTime | Data rejestracji |

### Tabela `Band`

| Pole | Typ | Opis |
|---|---|---|
| id | Integer (PK) | Unikalny identyfikator |
| name | String | Nazwa zespołu |
| city | String | Miasto |
| genre | String | Gatunek muzyczny |
| instrumentNeeded | String | Szukany instrument |
| description | String | Opis ogłoszenia |
| contactEmail | String | Email kontaktowy |
| createdAt | DateTime | Data utworzenia |
| userId | Integer (FK) | ID autora |

**Relacja:** User 1:N Band

## Uruchomienie lokalne

### Wymagania
- Docker i Docker Compose

### Kroki

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/BigJeffrey/bandfinder.git
cd bandfinder

# 2. Utwórz plik .env
cp .env.example .env

# 3. Uruchom aplikację
docker compose up --build
```

Aplikacja będzie dostępna pod:
- 🌐 Frontend: `http://localhost`
- 📡 Backend API: `http://localhost/api`
- 📖 Swagger docs: `http://localhost:3000/api-docs`
- ❤️ Health check: `http://localhost/api/health`

### Endpointy API

| Metoda | Endpoint | Opis | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Rejestracja użytkownika | ❌ |
| POST | `/api/auth/login` | Logowanie | ❌ |
| GET | `/api/bands` | Lista ogłoszeń (z filtrami) | ❌ |
| GET | `/api/bands/:id` | Szczegóły ogłoszenia | ❌ |
| POST | `/api/bands` | Dodaj ogłoszenie | ✅ |
| PUT | `/api/bands/:id` | Edytuj ogłoszenie | ✅ (właściciel) |
| DELETE | `/api/bands/:id` | Usuń ogłoszenie | ✅ (właściciel) |
| GET | `/api/health` | Health check | ❌ |

## Wersja online

🔗 **Link do aplikacji:** [UZUPEŁNIĆ - adres IP serwera VPS]

http://138.2.154.185/


🔗 **Link do repozytorium:** 

https://github.com/BigJeffrey/BandFinder.git

## Dokumentacja API

Interaktywna dokumentacja Swagger UI jest dostępna pod adresem `/api-docs` po uruchomieniu aplikacji.

## Zespół

| Osoba | Rola |
|---|---|
| Mateusz Serafin | Deployment & Infrastruktura |
| Piotr Baliński | Backend API |
| Nikodem Szubierski | Frontend |

## Licencja

MIT
