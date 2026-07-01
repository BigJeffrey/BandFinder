# Konfiguracja VPS - BandFinder

Przewodnik krok po kroku dotyczący wdrożenia aplikacji BandFinder na serwerze Oracle Cloud VPS.

## Wymagania

- **Serwer**: Oracle Cloud VPS (Always Free tier)
- **System operacyjny**: Ubuntu 22.04 LTS
- **Domena** (opcjonalnie): Skonfigurowana domena wskazująca na IP serwera
- **Konto GitHub**: Z dostępem do GitHub Container Registry (GHCR)

---

## Krok 1: Instalacja Docker i Docker Compose

Połącz się z serwerem przez SSH i wykonaj poniższe polecenia:

```bash
# Aktualizacja systemu
sudo apt update && sudo apt upgrade -y

# Instalacja wymaganych pakietów
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Dodanie klucza GPG Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Dodanie repozytorium Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalacja Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Dodanie użytkownika do grupy docker
sudo usermod -aG docker $USER
newgrp docker

# Weryfikacja instalacji
docker --version
docker compose version
```

---

## Krok 2: Konfiguracja firewalla

Oracle Cloud wymaga konfiguracji zarówno reguł Security List w panelu OCI, jak i iptables na serwerze.

### Reguły iptables na serwerze:

```bash
# Otwarcie portu 80 (HTTP)
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT

# Otwarcie portu 443 (HTTPS)
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT

# Zapisanie reguł
sudo netfilter-persistent save
sudo netfilter-persistent reload
```

### Reguły w panelu Oracle Cloud:

1. Przejdź do **Networking** → **Virtual Cloud Networks**
2. Wybierz swoją VCN → **Security Lists** → **Default Security List**
3. Dodaj **Ingress Rules**:
   - **Port 80**: Source CIDR `0.0.0.0/0`, Destination Port `80`, Protocol TCP
   - **Port 443**: Source CIDR `0.0.0.0/0`, Destination Port `443`, Protocol TCP

---

## Krok 3: Tworzenie struktury katalogów

```bash
# Tworzenie katalogu głównego aplikacji
sudo mkdir -p /opt/bandfinder
sudo chown $USER:$USER /opt/bandfinder
cd /opt/bandfinder
```

---

## Krok 4: Kopiowanie plików konfiguracyjnych

Skopiuj następujące pliki na serwer:

```bash
# Struktura katalogów na serwerze
/opt/bandfinder/
├── docker-compose.yml
├── .env
└── nginx/
    └── nginx.conf
```

### Tworzenie pliku .env:

```bash
cd /opt/bandfinder
nano .env
```

Zawartość pliku `.env`:

```env
POSTGRES_USER=bandfinder
POSTGRES_PASSWORD=TWOJE_BEZPIECZNE_HASLO
POSTGRES_DB=bandfinder
DATABASE_URL=postgresql://bandfinder:TWOJE_BEZPIECZNE_HASLO@postgres:5432/bandfinder
JWT_SECRET=TWOJ_BEZPIECZNY_KLUCZ_JWT
NODE_ENV=production
```

> **⚠️ Ważne**: Zmień `TWOJE_BEZPIECZNE_HASLO` i `TWOJ_BEZPIECZNY_KLUCZ_JWT` na silne, unikalne wartości!

---

## Krok 5: Logowanie do GitHub Container Registry

```bash
# Logowanie do GHCR
echo "TWOJ_GITHUB_TOKEN" | docker login ghcr.io -u TWOJA_NAZWA_UZYTKOWNIKA --password-stdin
```

> **Uwaga**: Token GitHub musi mieć uprawnienie `read:packages`.

---

## Krok 6: Uruchomienie aplikacji

```bash
cd /opt/bandfinder

# Pobranie najnowszych obrazów
docker compose pull

# Uruchomienie wszystkich usług w tle
docker compose up -d

# Uruchomienie migracji bazy danych
docker compose exec backend npx prisma migrate deploy
```

---

## Krok 7: Weryfikacja

```bash
# Sprawdzenie statusu kontenerów
docker compose ps

# Sprawdzenie logów
docker compose logs -f

# Test endpointu health
curl http://localhost/api/health

# Oczekiwana odpowiedź:
# {"status":"ok","timestamp":"2024-01-01T00:00:00.000Z"}
```

### Rozwiązywanie problemów:

```bash
# Sprawdzenie logów konkretnej usługi
docker compose logs backend
docker compose logs postgres
docker compose logs frontend

# Restart usług
docker compose restart

# Pełne przebudowanie
docker compose down
docker compose up -d
```

---

## Krok 8: Konfiguracja GitHub Secrets

W repozytorium GitHub przejdź do **Settings** → **Secrets and variables** → **Actions** i dodaj następujące sekrety:

| Nazwa sekretu      | Opis                                                    | Przykład                    |
|--------------------|----------------------------------------------------------|-----------------------------||
| `GHCR_TOKEN`       | Personal Access Token z uprawnieniem `write:packages`    | `ghp_xxxxxxxxxxxx`          |
| `SSH_HOST`         | Adres IP serwera VPS                                     | `129.xxx.xxx.xxx`           |
| `SSH_USERNAME`     | Nazwa użytkownika SSH                                    | `ubuntu`                    |
| `SSH_PRIVATE_KEY`  | Klucz prywatny SSH (cała zawartość pliku)                | `-----BEGIN OPENSSH...`     |

### Generowanie klucza SSH dla deploymentu:

```bash
# Na komputerze lokalnym
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/bandfinder_deploy

# Skopiowanie klucza publicznego na serwer
ssh-copy-id -i ~/.ssh/bandfinder_deploy.pub ubuntu@ADRES_IP_SERWERA

# Klucz prywatny (~/.ssh/bandfinder_deploy) skopiuj do GitHub Secret SSH_PRIVATE_KEY
```

---

## Przydatne polecenia

```bash
# Zatrzymanie aplikacji
docker compose down

# Zatrzymanie z usunięciem woluminów (UWAGA: usuwa dane!)
docker compose down -v

# Aktualizacja obrazów
docker compose pull && docker compose up -d

# Czyszczenie nieużywanych obrazów
docker image prune -f

# Dostęp do bazy danych
docker compose exec postgres psql -U bandfinder -d bandfinder

# Uruchomienie Prisma Studio (dostępne na porcie 5555)
docker compose exec backend npx prisma studio
```
