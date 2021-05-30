release: sh -c 'cd ./nusxchange && python manage.py syncdb --all && python manage.py migrate --fake'
web: sh -c 'cd ./nusxchange/ && gunicorn nusxchange.wsgi'