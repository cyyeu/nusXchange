release: python manage.py makemigrations api && python manage.py migrate --run-syncdb 
web: gunicorn nusxchange.wsgi