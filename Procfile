release: python manage.py migrate --run-syncdb && python manage.py migrate
web: gunicorn nusxchange.wsgi