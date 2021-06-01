release: python manage.py makemigrations api && python manage.py migrate --run-syncdb && python manage.py migrate --fake api
web: gunicorn nusxchange.wsgi