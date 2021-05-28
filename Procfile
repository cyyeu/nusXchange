release: 'cd ./nusxchange && python manage.py makemigrations && python manage.py migrate && cd ./frontend && npm run build'
web: sh -c 'cd ./nusxchange/ && gunicorn nusxchange.wsgi'