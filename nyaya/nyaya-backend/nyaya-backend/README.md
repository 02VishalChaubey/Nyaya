# Nyaya Backend (Django REST Framework)

A real API + database for the Nyaya frontend: SQLite database, Django admin
to add/edit laws and rights, and REST endpoints matching the shape of the
frontend's mock data (`src/data/*.js`) so they can eventually be swapped in.

**This has not been run in the environment that built it** (no internet
access there to install Django) — every file was hand-checked and
cross-referenced instead. Test it locally and send me any errors.

## Stack

Django 5 · Django REST Framework · django-cors-headers · SQLite

## Setup (Windows PowerShell)

```powershell
cd path\to\nyaya-backend

# Create a virtual environment
python -m venv venv

# Activate it — if you hit the SAME execution-policy error as with npm,
# run this first (same fix as before, session-only, no admin needed):
# Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Create the database tables
python manage.py makemigrations legal
python manage.py migrate

# Load starter content (same rights/laws/terms the frontend currently shows)
python manage.py seed_data

# Load a larger batch of real, researched Indian laws (28 more, across
# all 8 categories — see the docstring in seed_more_laws.py for sourcing notes)
python manage.py seed_more_laws

# Add the Constitution of India as a structured Part/Schedule index
# (real titles and article ranges, not the full article text — see
# the docstring in seed_constitution.py for why)
python manage.py seed_constitution

# Create a login for the admin panel
python manage.py createsuperuser
# (it will ask for a username, email, and password)

# Run the server
python manage.py runserver
```

Then open:
- **API root:** http://127.0.0.1:8000/api/laws/
- **Admin panel:** http://127.0.0.1:8000/admin/ (log in with the superuser you just created)

Keep this terminal window open while using it — same as the frontend's
`npm run dev`, closing the window stops the server. You can run the frontend
(`npm run dev`, port 5173) and this backend (`python manage.py runserver`,
port 8000) **at the same time**, in two separate terminal windows.

## Setup (macOS / Linux)

```bash
cd path/to/nyaya-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations legal
python manage.py migrate
python manage.py seed_data
python manage.py seed_more_laws
python manage.py seed_constitution
python manage.py createsuperuser
python manage.py runserver
```

## API endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/rights/` | All fundamental rights |
| GET | `/api/categories/` | All law categories |
| GET | `/api/laws/` | All laws — supports `?category=<id>` and `?q=<text>` |
| GET | `/api/laws/<id>/` | One law, with its sections and related laws |
| GET | `/api/legal-terms/` | All glossary terms — supports `?q=<text>` |
| GET | `/api/legal-terms/<id>/` | One glossary term |
| GET | `/api/situation-categories/` | The category buttons on the "I Have Been Harmed" form |
| GET | `/api/search/?q=<text>` | Aggregated search across rights, laws, sections, terms |
| POST | `/api/situations/analyze/` | Mock "I Have Been Harmed" result (body: `{"description": "...", "category": "..."}`) |

`/api/situations/analyze/` is intentionally still a **mock** — it returns a
fixed placeholder result, not a real AI/legal-matching engine (that was
explicitly out of scope). It exists so the frontend has a real endpoint to
call instead of hardcoding the mock result in JavaScript.

## Editing content

Go to http://127.0.0.1:8000/admin/ and log in. You can add/edit:
- Fundamental Rights
- Categories
- Laws (with expandable sections directly on the same page, and a
  multi-select for "related laws")
- Legal Terms (glossary)
- Situation Categories

Changes show up immediately in the API — no restart needed.

## Connecting the frontend

The frontend currently still reads from its own `src/data/*.js` files — this
backend runs standalone for now. To wire them together later, replace each
page's static data import with a `fetch()` call to the matching endpoint
above; the JSON shape matches the mock data objects closely by design.

## Notes

- `db.sqlite3` is created the first time you run `migrate` — it's a real
  file on disk in this folder and will keep your data between restarts.
- `SECRET_KEY` in `nyaya_backend/settings.py` is a development-only
  placeholder — generate a real one before any deployment.
- `DEBUG = True` and open CORS for `localhost:5173` are also
  development-only settings.
