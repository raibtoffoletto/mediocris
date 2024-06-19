# Mediocris

> A simple fuel and economy tracker. Currently just keep records of your refueling and the average consumption in `l/km`.

# Install

The easiest way to run the application is through docker with the use of a docker-compose file and environment variables.

Create a new directory and a data directory:

```bash
mkdir mediocris
cd mediocris

mkdir data
sudo chown 1001:1001 data
```

Copy the `docker-compose.yml` file from this repo, or create a new one:

```yaml
services:
  app:
    image: raibtoffoletto/mediocris:latest
    restart: always
    container_name: mediocris
    user: 1001:1001
    volumes:
      - ./data:/data
    ports:
      - 3000:3000
    environment:
      - APP_PASSWORD
      - JWT_KEY
      - JWT_ISSUER
      - JWT_AUDIENCE
      - DB_PATH
```

Create a `.env` file with the following variables.
Use a strong (minimum 8 characters long) password for the app.
For the `JWT_KEY`, you must randomly generate it with `openssl rand -base64 24`.

```bash
APP_PASSWORD="password"         # the sign in password
JWT_KEY="your-secret-key"       # unique key to encript session
JWT_ISSUER="your-issuer"        # JWT unique issuer
JWT_AUDIENCE="your-audience"    # JWT unique audience
DB_PATH="/data"                 # path to the database directory
```

Then, create the containers. The web interface will be available at `http://localhost:3000`.

```bash
docker-compose up -d
```

> <!> If you would like to access it through the internet, a reverse proxy with a valid SSL is strongly adivised.

# Development

## Dependencies

- NodeJS (18+)
- Yarn
- Docker

## Configuration

Clone this repository and enter its directory:

```bash
git clone https://github.com/raibtoffoletto/mediocris.git

cd mediocris
```

Copy the `.env.example` to `.env` file and fill the necessary information. The `DB_PATH` can be ignored.

Install the dependecies and run the app:

```bash
yarn --ignore-engines

yarn dev
```

The development app will be available at `http://localhost:3000`

## Building

To build and run a local docker image:

```bash
yarn build:docker

# the data directory must have the same permissions as the nodejs user in the docker container
mkdir data
sudo chown 1001:1001 data

# change the 'image' value to just 'mediocris' in the docker-compose.yml
docker-compose up -d
```

# Acknoledgements

Excerpta is built using awesome open source projects! Heartfelt thanks to:

- [MUI](https://mui.com/)
- [next-pwa](https://github.com/shadowwalker/next-pwa)
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [sqlite](https://www.sqlite.org/)
