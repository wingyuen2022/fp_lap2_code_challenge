# fp_lap2_code_challenge

# This is our Telegraph

## Start up procedure
- Download a latest copy from git 'git clone https://github.com/wingyuen2022/fp_lap2_code_challenge.git'
- Change directory by command 'cd fp_lap2_code_challenge'
- Make sure your docker is up and running
- Execute command 'docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up'

## Testing procedure
- Launch any browser and visit 'http://localhost:3000/' and it should return with welcome message
- Then right-click on '/client/index.html' then select 'Open with Live Server'
- In browser visit 'http://localhost:5500/client/index.html

## Shut down procedure
- Execute command 'docker compose down --volumes --remove-orphans'
- Then execute command 'docker volume prune --force'