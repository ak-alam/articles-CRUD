FROM python:3.11-slim-bookworm

RUN apt update && \
    apt install pkg-config -y \
    python3-dev -y \
    default-libmysqlclient-dev -y \
    build-essential -y

WORKDIR /app
COPY . .
EXPOSE 5000
RUN pip install -r requirements.txt
ENTRYPOINT ["python", "app.py"]