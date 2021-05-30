release: sh -c 'cd ./nusxchange && python manage.py makemigrations && python manage.py migrate'
web: sh -c 'cd ./nusxchange/ && gunicorn nusxchange.wsgi'