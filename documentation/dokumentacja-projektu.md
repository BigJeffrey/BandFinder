# Dokumentacja projektu BandFinder

## Cel dokumentacji

Dokumentacja opisuje proces pracy nad aplikacja BandFinder: od analizy problemu, przez plan funkcjonalnosci i architekture techniczna, po implementacje backendu, konteneryzacje, wdrozenie oraz sposob prezentacji gotowego rozwiazania.

BandFinder to aplikacja webowa dla muzykow i zespolow muzycznych. Jej glownym celem jest stworzenie jednego miejsca, w ktorym zespoly moga publikowac ogloszenia o poszukiwaniu instrumentalistow, a muzycy moga filtrowac i przegladac aktualne oferty wedlug miasta, gatunku muzycznego i potrzebnego instrumentu.

---

## 1. Analiza problemu

### 1.1. Opis problemu

Muzycy szukajacy zespolu oraz zespoly szukajace nowych czlonkow czesto korzystaja z rozproszonych zrodel: grup w mediach spolecznosciowych, for internetowych, lokalnych ogloszen albo kontaktow prywatnych. Takie rozwiazania sa malo uporzadkowane, trudne do przeszukiwania i szybko traca aktualnosc.

Problem uzytkownika polega na braku scentralizowanej platformy, ktora pozwala szybko znalezc dopasowane ogloszenia muzyczne. Dla muzyka wazne jest, aby znalezc zespol w swojej lokalizacji, grajacy interesujacy gatunek i szukajacy konkretnego instrumentu. Dla lidera zespolu istotne jest szybkie dotarcie do osob, ktore rzeczywiscie pasuja do potrzeb zespolu.

Problem jest istotny, poniewaz muzyka zespolowa wymaga dopasowania kilku czynnikow jednoczesnie: lokalizacji, stylu muzycznego, instrumentu, kontaktu i aktualnosci ogloszenia. Brak uporzadkowanego systemu powoduje strate czasu oraz sprawia, ze potencjalne wspolprace moga nigdy nie dojsc do skutku.

Uzytkownik bedzie korzystac z aplikacji w sytuacji, gdy aktywnie szuka zespolu albo chce znalezc nowego czlonka do istniejacego skladu. Aplikacja ma ulatwic przegladanie ogloszen, filtrowanie wynikow, publikowanie wlasnych ofert oraz kontakt z autorem ogloszenia.

### 1.2. Uzytkownik aplikacji

| Typ uzytkownika | Potrzeby |
|---|---|
| Muzyk szukajacy zespolu | Przegladanie ogloszen, filtrowanie po instrumencie, miescie i gatunku, szybki kontakt z zespolem |
| Lider zespolu | Rejestracja, logowanie, publikowanie ogloszen, edycja i usuwanie wlasnych ogloszen |
| Administrator/deweloper | Stabilne API, dokumentacja Swagger, prosty deploy, mozliwosc monitorowania stanu aplikacji |

Najwazniejsza potrzeba uzytkownika koncowego to szybkie znalezienie pasujacego ogloszenia bez przeszukiwania wielu rozproszonych miejsc. Najwazniejsza potrzeba autora ogloszenia to proste dodanie informacji o zespole i poszukiwanym instrumencie.

### 1.3. Analiza konkurencji i podobnych rozwiazan

| Rozwiazanie | Co robi dobrze | Ograniczenia | Czym rozni sie BandFinder | Inspiracja |
|---|---|---|---|---|
| BandMix.com | Duza baza uzytkownikow, filtry, profile muzykow | Model platny, glownie rynek anglojezyczny, brak publicznego API | BandFinder jest prostszy, darmowy i przygotowany pod polskie dane | Filtrowanie po instrumencie i gatunku |
| JoinMyBand.com | Proste publikowanie ogloszen, darmowy dostep | Przestarzaly interfejs, ograniczone filtrowanie, brak API | BandFinder laczy prostote ogloszen z nowoczesnym REST API | Latwy proces publikowania ogloszenia |
| Grupy na Facebooku | Duzy zasieg, znane narzedzie, szybka komunikacja | Brak struktury danych, slabe wyszukiwanie, ogloszenia gina w feedzie | BandFinder porzadkuje dane i pozwala filtrowac wyniki | Pomysl szybkiego kontaktu z autorem |

---

## 2. Analiza funkcjonalna

### 2.1. Lista funkcji aplikacji

1. Rejestracja uzytkownika z walidacja danych: email, haslo i nazwa uzytkownika.
2. Logowanie uzytkownika i generowanie tokena JWT waznego przez 7 dni.
3. Hashowanie hasel za pomoca bcryptjs.
4. Dodawanie ogloszenia o poszukiwaniu muzyka.
5. Podanie danych ogloszenia: nazwa zespolu, miasto, gatunek, poszukiwany instrument, opis i email kontaktowy.
6. Walidacja danych wejsciowych dla rejestracji, logowania i ogloszen.
7. Wyswietlanie listy ogloszen.
8. Paginacja listy ogloszen przez parametry `page` i `limit`.
9. Filtrowanie ogloszen po miescie (`city`).
10. Filtrowanie ogloszen po gatunku muzycznym (`genre`).
11. Filtrowanie ogloszen po poszukiwanym instrumencie (`instrumentNeeded`).
12. Wyszukiwanie ogloszen po nazwie zespolu (`search`).
13. Wyswietlanie szczegolow pojedynczego ogloszenia.
14. Edycja wlasnego ogloszenia po weryfikacji wlasciciela.
15. Usuwanie wlasnego ogloszenia po weryfikacji wlasciciela.
16. Obsluga bledow z odpowiednimi kodami HTTP.
17. Dokumentacja API w Swagger/OpenAPI 3.0.
18. Health check pod adresem `/api/health`.
19. Konteneryzacja aplikacji w Dockerze.
20. Automatyczny deploy po pushu do galezi `main` przez GitHub Actions.
21. Udostepnienie aplikacji online na Oracle Cloud VPS.

Aktualny frontend zawiera widok informacyjny projektu BandFinder i liste podstawowych endpointow API. Pelna logika aplikacji jest przygotowana po stronie backendu jako REST API.

### 2.2. User stories

1. Jako muzyk chce przegladac liste ogloszen zespolow, aby znalezc zespol szukajacy mojego instrumentu.
2. Jako muzyk chce filtrowac ogloszenia po miescie, aby znalezc zespoly w mojej okolicy.
3. Jako muzyk chce filtrowac ogloszenia po gatunku muzycznym, aby znalezc zespol grajacy muzyke, ktora mnie interesuje.
4. Jako muzyk chce wyszukiwac zespoly po nazwie, aby szybko odnalezc konkretne ogloszenie.
5. Jako lider zespolu chce utworzyc konto, aby moc dodawac ogloszenia.
6. Jako lider zespolu chce dodac ogloszenie o poszukiwaniu muzyka, aby znalezc nowego czlonka zespolu.
7. Jako lider zespolu chce edytowac swoje ogloszenie, aby aktualizowac informacje o potrzebach zespolu.
8. Jako lider zespolu chce usunac swoje ogloszenie, gdy znajde odpowiednia osobe.
9. Jako uzytkownik chce widziec email kontaktowy, aby moc skontaktowac sie z autorem ogloszenia.
10. Jako uzytkownik chce otrzymywac czytelne komunikaty bledow, aby wiedziec, ktore dane wymagaja poprawy.
11. Jako deweloper chce miec dokumentacje Swagger API, aby latwo testowac endpointy.
12. Jako deweloper chce, aby po pushu do `main` aplikacja automatycznie sie budowala i wdrazala na serwer.
13. Jako administrator chce monitorowac aplikacje przez endpoint `/api/health`, aby szybko sprawdzic, czy backend dziala.

### 2.4. Lista zadan projektowych

| ID | Zadanie | Priorytet | Status |
|---|---|---|---|
| T1 | Analiza problemu i podobnych rozwiazan | Wysoki | Wykonane |
| T2 | Przygotowanie modelu danych User i Band | Wysoki | Wykonane |
| T3 | Konfiguracja backendu Express | Wysoki | Wykonane |
| T4 | Implementacja rejestracji i logowania | Wysoki | Wykonane |
| T5 | Implementacja generowania tokenow JWT | Wysoki | Wykonane |
| T6 | Implementacja middleware autoryzacji | Wysoki | Wykonane |
| T7 | Implementacja CRUD ogloszen | Wysoki | Wykonane |
| T8 | Implementacja filtrowania i wyszukiwania | Wysoki | Wykonane |
| T9 | Implementacja paginacji | Wysoki | Wykonane |
| T10 | Walidacja danych wejsciowych | Wysoki | Wykonane |
| T11 | Globalna obsluga bledow | Wysoki | Wykonane |
| T12 | Dokumentacja Swagger/OpenAPI | Sredni | Wykonane |
| T13 | Testy API Jest/Supertest | Sredni | Wykonane |
| T14 | Dockerfile backendu | Wysoki | Wykonane |
| T15 | Dockerfile frontendu | Wysoki | Wykonane |
| T16 | Konfiguracja Docker Compose | Wysoki | Wykonane |
| T17 | Konfiguracja Nginx/reverse proxy | Wysoki | Wykonane |
| T18 | Konfiguracja GitHub Actions CI/CD | Wysoki | Wykonane |
| T19 | Wdrozenie na Oracle Cloud VPS | Wysoki | Wykonane |
| T20 | Przygotowanie README i dokumentacji projektu | Sredni | Wykonane |

### 2.5. Narzedzie do zarzadzania zadaniami

Do organizacji pracy mozna wykorzystac GitHub Projects albo liste zadan w dokumentacji/README. Zadania zostaly podzielone na trzy podstawowe statusy:

| Kolumna | Znaczenie |
|---|---|
| To Do | Zadania zaplanowane do wykonania |
| In Progress | Zadania aktualnie realizowane |
| Done | Zadania zakonczone |

Zadania odpowiadaly konkretnym elementom funkcjonalnym: backend API, walidacji, dokumentacji Swagger, konteneryzacji, konfiguracji Nginx i deployu. W dokumentacji koncowej nalezy dolaczyc zrzut ekranu tablicy zadan albo liste zadan z widocznymi statusami.

---

## 3. Harmonogram pracy

| Etap | Zakres prac | Planowany termin | Status |
|---|---|---|---|
| 1 | Analiza problemu, uzytkownikow i konkurencji | Tydzien 1 | Wykonane |
| 2 | Lista funkcji, user stories i zadania projektowe | Tydzien 1 | Wykonane |
| 3 | Projekt modelu danych i struktury backendu | Tydzien 2 | Wykonane |
| 4 | Implementacja autoryzacji JWT | Tydzien 2 | Wykonane |
| 5 | Implementacja endpointow CRUD dla ogloszen | Tydzien 2-3 | Wykonane |
| 6 | Walidacja, obsluga bledow, filtrowanie i paginacja | Tydzien 3 | Wykonane |
| 7 | Swagger API i testy backendu | Tydzien 3-4 | Wykonane |
| 8 | Docker, Docker Compose i Nginx | Tydzien 4 | Wykonane |
| 9 | GitHub Actions i deploy na VPS | Tydzien 4 | Wykonane |
| 10 | Dokumentacja koncowa i prezentacja | Tydzien 4 | Wykonane |

Harmonogram zostal zrealizowany zgodnie z glownym planem. Najwiecej czasu zajely elementy infrastrukturalne: konfiguracja GitHub Actions, dostep SSH do VPS, uprawnienia GHCR oraz poprawne przekazywanie zmiennych srodowiskowych. Po stronie backendu najwiecej uwagi wymagaly walidacja danych, obsluga bledow oraz utrzymanie zgodnosci endpointow z dokumentacja Swagger.

Najwiekszym problemem organizacyjnym bylo utrzymanie spojnosci miedzy kilkoma warstwami projektu: backendem, baza danych, kontenerami, reverse proxy i pipeline'em CI/CD. Kazda zmiana w API lub konfiguracji wymagala sprawdzenia, czy nadal dziala lokalnie oraz po wdrozeniu.

---

## 4. Specyfikacja techniczna

### 4.1. Technologie

| Technologia | Zastosowanie |
|---|---|
| React 18 | Frontend aplikacji i komponent glowny interfejsu |
| Vite | Szybkie budowanie i uruchamianie frontendu |
| Axios | Komunikacja HTTP z API |
| React Router | Przygotowanie do routingu po stronie frontendu |
| Node.js 20 | Srodowisko uruchomieniowe backendu |
| Express.js | Framework HTTP dla REST API |
| Prisma ORM | Komunikacja backendu z baza PostgreSQL |
| PostgreSQL 15 | Relacyjna baza danych aplikacji |
| JWT/jsonwebtoken | Bezstanowa autoryzacja uzytkownikow |
| bcryptjs | Hashowanie hasel uzytkownikow |
| express-validator | Walidacja danych wejsciowych |
| Swagger/OpenAPI | Interaktywna dokumentacja API |
| Jest + Supertest | Testy backendowego API |
| Docker | Konteneryzacja aplikacji |
| Docker Compose | Uruchamianie wielu uslug: baza, backend, frontend |
| Nginx | Reverse proxy i serwowanie ruchu HTTP |
| GitHub Actions | Automatyczny build i deploy |
| GitHub Container Registry | Przechowywanie obrazow Dockera |
| Oracle Cloud VPS | Hosting produkcyjny aplikacji |

### 4.2. Model danych

#### Tabela `User`

| Pole | Typ | Ograniczenia | Opis |
|---|---|---|---|
| `id` | Integer | PK, auto-increment | Unikalny identyfikator uzytkownika |
| `email` | String | UNIQUE, NOT NULL | Adres email uzytkownika, uzywany do logowania |
| `password` | String | NOT NULL | Zahashowane haslo |
| `name` | String | NOT NULL | Imie albo nick uzytkownika |
| `createdAt` | DateTime | DEFAULT now() | Data rejestracji |
| `bands` | Relacja | 1:N do `Band` | Lista ogloszen utworzonych przez uzytkownika |

#### Tabela `Band`

| Pole | Typ | Ograniczenia | Opis |
|---|---|---|---|
| `id` | Integer | PK, auto-increment | Unikalny identyfikator ogloszenia |
| `name` | String | NOT NULL | Nazwa zespolu |
| `city` | String | NOT NULL | Miasto zespolu |
| `genre` | String | NOT NULL | Gatunek muzyczny |
| `instrumentNeeded` | String | NOT NULL | Poszukiwany instrument |
| `description` | String | NOT NULL | Opis ogloszenia |
| `contactEmail` | String | NOT NULL | Email kontaktowy |
| `createdAt` | DateTime | DEFAULT now() | Data utworzenia ogloszenia |
| `userId` | Integer | FK do `User.id` | Autor ogloszenia |

Relacja w modelu danych: jeden uzytkownik moze utworzyc wiele ogloszen, a kazde ogloszenie nalezy do dokladnie jednego uzytkownika.

### 4.3. Architektura aplikacji

Aplikacja sklada sie z kilku warstw:

```text
Uzytkownik / przegladarka
        |
        v
Nginx reverse proxy
        |
        +--> Frontend React/Vite
        |
        +--> Backend Express API
                    |
                    v
              Prisma ORM
                    |
                    v
              PostgreSQL
```

Struktura projektu:

```text
BandFinder/
├── .github/workflows/deploy.yml       # GitHub Actions CI/CD
├── backend/                           # Backend Express API
│   ├── prisma/schema.prisma           # Model bazy danych
│   ├── src/config/swagger.js          # Konfiguracja Swagger
│   ├── src/middleware/auth.js         # Autoryzacja JWT
│   ├── src/middleware/errorHandler.js # Globalna obsluga bledow
│   ├── src/middleware/validate.js     # Walidacja requestow
│   ├── src/routes/auth.js             # Rejestracja i logowanie
│   ├── src/routes/bands.js            # CRUD ogloszen
│   ├── src/routes/index.js            # Agregacja tras
│   ├── src/utils/generateToken.js     # Generowanie tokenow JWT
│   ├── src/validators/                # Reguly walidacji
│   ├── __tests__/bands.test.js        # Testy API
│   └── Dockerfile                     # Obraz backendu
├── frontend/                          # Frontend React/Vite
│   ├── src/App.jsx                    # Glowny komponent aplikacji
│   ├── src/App.css                    # Style komponentu
│   ├── src/index.css                  # Style globalne
│   ├── src/main.jsx                   # Punkt wejscia React
│   └── Dockerfile                     # Obraz frontendu
├── nginx/nginx.conf                   # Reverse proxy
├── docs/vps-setup.md                  # Instrukcja VPS
├── documentation/                     # Dokumentacja projektu
├── docker-compose.yml                 # Orkiestracja kontenerow
├── .env.example                       # Szablon zmiennych srodowiskowych
└── README.md                          # Opis projektu
```

Najwazniejsze elementy backendu:

| Element | Rola |
|---|---|
| `routes/auth.js` | Rejestracja i logowanie uzytkownika |
| `routes/bands.js` | Endpointy listy, szczegolow, dodawania, edycji i usuwania ogloszen |
| `middleware/auth.js` | Weryfikacja tokena JWT i dolaczenie uzytkownika do `req.user` |
| `middleware/validate.js` | Uruchamianie reguly express-validator i zwracanie bledow 422 |
| `middleware/errorHandler.js` | Obsluga bledow Prisma, JWT, walidacji i bledow serwera |
| `validators/*` | Reguly walidacji dla autoryzacji i ogloszen |
| `config/swagger.js` | Dokumentacja OpenAPI/Swagger |
| `prisma/schema.prisma` | Definicja tabel i relacji w bazie danych |

### 4.4. Przeplyw dzialania aplikacji

#### Scenariusz: rejestracja i logowanie

1. Uzytkownik wysyla dane rejestracji do `POST /api/auth/register`.
2. Backend sprawdza poprawnosc emaila, hasla i nazwy.
3. Haslo jest hashowane przez bcryptjs.
4. Prisma zapisuje uzytkownika w PostgreSQL.
5. Uzytkownik wysyla dane logowania do `POST /api/auth/login`.
6. Backend wyszukuje uzytkownika po emailu.
7. bcryptjs porownuje haslo z hashem z bazy.
8. Po poprawnym logowaniu backend generuje token JWT.
9. Frontend moze wykorzystywac token do operacji wymagajacych autoryzacji.

#### Scenariusz: dodawanie ogloszenia

1. Zalogowany uzytkownik wysyla `POST /api/bands` z tokenem JWT w naglowku `Authorization`.
2. Middleware `auth.js` weryfikuje token.
3. Backend pobiera uzytkownika i zapisuje go w `req.user`.
4. Middleware walidacji sprawdza wymagane pola ogloszenia.
5. Jesli dane sa niepoprawne, API zwraca kod 422 z lista bledow.
6. Jesli dane sa poprawne, Prisma tworzy rekord `Band` z `userId` autora.
7. Backend zwraca odpowiedz 201 z danymi nowego ogloszenia.

#### Scenariusz: przegladanie i filtrowanie ogloszen

1. Uzytkownik wysyla `GET /api/bands`.
2. Opcjonalnie dodaje parametry: `city`, `genre`, `instrumentNeeded`, `search`, `page`, `limit`.
3. Backend buduje zapytanie Prisma na podstawie parametrow.
4. PostgreSQL zwraca dopasowane rekordy.
5. API zwraca liste ogloszen wraz z informacjami potrzebnymi do paginacji.

#### Scenariusz: edycja lub usuwanie ogloszenia

1. Uzytkownik wysyla `PUT /api/bands/:id` albo `DELETE /api/bands/:id`.
2. Backend weryfikuje token JWT.
3. Backend sprawdza, czy ogloszenie nalezy do zalogowanego uzytkownika.
4. Jesli uzytkownik nie jest wlascicielem, API zwraca blad 403.
5. Jesli uzytkownik jest wlascicielem, rekord zostaje zaktualizowany albo usuniety.

---

## 5. Kod i repozytorium

### 5.1. Repozytorium

Link do repozytorium GitHub: <https://github.com/BigJeffrey/BandFinder.git>

Instrukcja uruchomienia lokalnego:

```bash
git clone https://github.com/BigJeffrey/BandFinder.git
cd BandFinder
cp .env.example .env
docker compose up --build
```

Po uruchomieniu lokalnym:

| Adres | Opis |
|---|---|
| `http://localhost` | Frontend |
| `http://localhost/api` | Backend API przez reverse proxy |
| `http://localhost:3000/api-docs` | Swagger UI |
| `http://localhost/api/health` | Health check |

### 5.2. Commity

Historia commitow powinna pokazywac kolejne etapy pracy. Przykladowy podzial logiczny commitow w projekcie:

| Commit | Opis | Kluczowe pliki |
|---|---|---|
| Commit 1 | Struktura projektu, Dockerfiles, Docker Compose, `.env.example` | `docker-compose.yml`, `backend/Dockerfile`, `frontend/Dockerfile`, `.env.example` |
| Commit 2 | GitHub Actions, Nginx, Express bootstrap i Prisma schema | `.github/workflows/deploy.yml`, `nginx/nginx.conf`, `backend/src/index.js`, `backend/prisma/schema.prisma` |
| Commit 3 | JWT auth, endpointy rejestracji/logowania, generator tokenow | `backend/src/routes/auth.js`, `backend/src/middleware/auth.js`, `backend/src/utils/generateToken.js` |
| Commit 4 | CRUD ogloszen, filtrowanie, paginacja | `backend/src/routes/bands.js`, `backend/src/validators/bandValidators.js` |
| Commit 5 | Walidacja, obsluga bledow, Swagger i testy | `backend/src/middleware/*`, `backend/src/config/swagger.js`, `backend/__tests__/bands.test.js` |
| Commit 6 | Dokumentacja VPS, README i dokumentacja koncowa | `docs/vps-setup.md`, `README.md`, `documentation/*` |

### 5.3. README.md

Repozytorium zawiera plik `README.md`, ktory opisuje:

1. nazwe projektu,
2. krotki opis i cel aplikacji,
3. liste funkcji,
4. uzyte technologie,
5. model danych,
6. instrukcje uruchomienia lokalnego,
7. endpointy API,
8. link do wersji online,
9. link do repozytorium,
10. informacje o zespole.

---

## 6. Deploy aplikacji

### 6.1. Wersja online

Link do aplikacji online: <http://138.2.154.185/>

Link do repozytorium: <https://github.com/BigJeffrey/BandFinder.git>

### 6.2. Architektura wdrozenia

```mermaid
graph TD
    Internet[Internet] --> Nginx[Nginx :80]
    Nginx -->|/| Frontend[Frontend container - React + Nginx]
    Nginx -->|/api/*| Backend[Backend container - Express :3000]
    Backend --> PostgreSQL[PostgreSQL container :5432]

    subgraph Docker Compose
        Nginx
        Frontend
        Backend
        PostgreSQL
    end

    subgraph Oracle Cloud VPS
        Docker Compose
    end
```

Aplikacja jest wdrozona na Oracle Cloud VPS. Calosc dziala w kontenerach Docker uruchamianych przez Docker Compose. Publiczny ruch HTTP trafia najpierw do Nginx, ktory przekazuje zapytania do frontendu albo backendu.

### 6.3. Komponenty deploymentu

| Komponent | Rola |
|---|---|
| `postgres` | Baza PostgreSQL 15 z persystentnym wolumenem |
| `backend` | Express API na porcie 3000 |
| `frontend` | Zbudowany React serwowany przez Nginx |
| `nginx` | Reverse proxy dla frontendu i API |
| GitHub Actions | Automatyczny build i deploy po pushu do `main` |
| GHCR | Rejestr obrazow Docker |

### 6.4. CI/CD

Workflow `.github/workflows/deploy.yml` uruchamia sie po pushu do galezi `main`.

Przeplyw CI/CD:

1. GitHub Actions pobiera kod z repozytorium.
2. Workflow loguje sie do GitHub Container Registry.
3. Budowany jest obraz backendu.
4. Budowany jest obraz frontendu.
5. Obrazy sa publikowane w GHCR z tagami `latest` i SHA commita.
6. Workflow laczy sie przez SSH z Oracle VPS.
7. Na serwerze wykonywane jest `docker compose pull`.
8. Kontenery sa restartowane przez `docker compose up -d`.
9. Niepotrzebne obrazy sa usuwane przez `docker image prune -f`.

Wymagane GitHub Secrets:

| Secret | Opis |
|---|---|
| `GHCR_TOKEN` | Token z uprawnieniem do publikacji obrazow w GHCR |
| `SSH_HOST` | Adres IP serwera VPS |
| `SSH_USERNAME` | Nazwa uzytkownika SSH |
| `SSH_PRIVATE_KEY` | Klucz prywatny SSH |

### 6.5. Instrukcja uruchomienia na VPS

Skrocona instrukcja:

```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

sudo mkdir -p /opt/bandfinder
sudo chown $USER:$USER /opt/bandfinder
cd /opt/bandfinder

cp .env.example .env
nano .env

docker compose pull
docker compose up -d
docker compose ps
curl http://localhost/api/health
```

Na serwerze oraz w panelu Oracle Cloud nalezy otworzyc porty 22 i 80. Jezeli planowane jest HTTPS, nalezy dodatkowo przygotowac port 443 i certyfikat TLS.

---

## 7. Screenshoty i materialy wizualne

Do dokumentacji koncowej nalezy dolaczyc zrzuty ekranu. Rekomendowana struktura:

```text
documentation/screenshots/
├── 01-strona-glowna.png
├── 02-swagger-api.png
├── 03-health-check.png
├── 04-walidacja-bledu.png
├── 05-docker-compose-ps.png
└── 06-wersja-online.png
```

Minimalny zestaw screenshotow:

| Screenshot | Co powinien pokazywac |
|---|---|
| Ekran glowny aplikacji | Strone BandFinder uruchomiona lokalnie albo online |
| Przyklad glownej funkcji | Liste endpointow albo wynik `GET /api/bands` |
| Przyklad walidacji | Blad 422 przy niepoprawnych danych requestu |
| Swagger UI | Interaktywna dokumentacje API |
| Wersja online | Aplikacje pod adresem `http://138.2.154.185/` |
| Deploy/serwer | Wynik `docker compose ps` albo GitHub Actions workflow |

Screenshoty moga zostac umieszczone w tej dokumentacji albo w pliku `README.md` jako linki do obrazow z folderu `documentation/screenshots`.

---

## 8. Najwazniejsze zalozenia i decyzje projektowe

Najwazniejszym zalozeniem projektu bylo przygotowanie aplikacji, ktora rozwiazuje konkretny problem: uporzadkowanie ogloszen muzycznych i ulatwienie kontaktu miedzy zespolami a muzykami. Z tego powodu model danych zostal ograniczony do dwoch glownych encji: `User` i `Band`. Pozwala to zachowac prostote projektu, a jednoczesnie obsluzyc najwazniejsze procesy: konto uzytkownika, publikacje ogloszenia, filtrowanie, edycje i usuwanie.

Backend zostal zaprojektowany jako REST API, poniewaz taki podzial ulatwia oddzielenie logiki aplikacji od interfejsu uzytkownika. Dzieki dokumentacji Swagger frontend lub zewnetrzny klient moze latwo sprawdzic dostepne endpointy i formaty danych.

Do bazy danych wybrano PostgreSQL, poniewaz dane aplikacji maja charakter relacyjny: uzytkownik tworzy wiele ogloszen, a ogloszenie zawsze nalezy do jednego autora. Prisma ORM ulatwia prace z modelem danych i zmniejsza ryzyko bledow w zapytaniach.

Docker i Docker Compose zostaly wybrane, aby srodowisko bylo powtarzalne lokalnie i produkcyjnie. GitHub Actions automatyzuje deploy, co zmniejsza liczbe recznych krokow i ogranicza ryzyko pomylek podczas aktualizacji aplikacji.

Projekt pokazuje pelny proces pracy: od analizy problemu i zaplanowania funkcji, przez implementacje API i infrastruktury, po wdrozenie online oraz przygotowanie dokumentacji koncowej.
