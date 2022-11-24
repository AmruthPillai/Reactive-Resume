# Docker

This is probably the easiest method to build the source code on your machine if you already have Docker and Docker Compose installed. If you don't have Docker on your machine, I'll let you figure that out on your own.

## Setting it up
1. Once you have Docker set up, you can pull the source code from GitHub and dive into the repository.

```bash
git clone https://github.com/AmruthPillai/Reactive-Resume.git
cd Reactive-Resume
```
2. Install Node.JS  
**Installation instructions:** [nodejs.org](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)

3. Install [pnpm](https://pnpm.io/), but feel free to use any other package manager that supports [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces). 
**Installation instructions:** [pnpm.io](https://pnpm.io/installation)

4. Install dependencies using pnpm or another package manager you might prefer

```bash
pnpm install
```

5. Copy the `.env.example` file to `.env` in the project root and fill it with values according to your setup. To know which environment variables are required, and about what they do, head over [this section](https://docs.rxresu.me/source-code/environment-variables). For a quickstart you only need to change ```PUBLIC_URL``` and ```PUBLIC_SERVER_URL``` to the IP adress of the machine you're running the server on, ```SECRET_KEY``` and ```JWT_SECRET```.

```bash
cp .env.example .env
```

6. Use Docker Compose to create a PostgreSQL instance and a `reactive_resume` database, or feel free to use your own and modify the variables used in `.env`

```bash
docker-compose up -d postgres
```

7. Run the project and start building!

```bash
pnpm dev
```
The startup might take a while - depending on your machine. Sit tight and keep an eye on any error messages that might arise.

## Troubleshooting
```ERROR: Version in "./docker-compose.yml" is unsupported. You might be seeing this error because you're using the wrong Compose file version. Either specify a supported version (e.g "2.2" or "3.3") and place your service definitions under theserviceskey, or omit theversionkey and place your service definitions at the root of the file to use version 1. For more on the Compose file format versions, see https://docs.docker.com/compose/compose-file/```  
  - On my configuration I had to set the version in docker-compose.yml to 3.7 instead of 3.8 for my docker-compose successfully start up the postgres container.  

```FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory```  
  - I received this error on my machine. I used the following command to increase the memory to 4GB:  
```bash
export NODE_OPTIONS=--max_old_space_size=4096 #4GB
```
