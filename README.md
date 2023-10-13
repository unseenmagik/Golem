# Golem 
(fork of RDMoople2 for Golbat)

## Installation  
1. Clone repository `git clone https://github.com/unseenmagik/Golem`  
1. Install dependencies `npm run update`  
1. Copy config `cp src/configs/config.example.json src/configs/config.json`  
1. Create a Discord bot at https://discord.com/developers and enter the `botToken`, `clientId`, and `clientSecret` in your `config.json`  
1. Fill out config `vi src/configs/config.json`  
1. Create or copy your existing geofences to the `geofences` folder. One geofence per file, the following is the expected format:  
    ```ini
    [City Name]
    0,0
    1,1
    2,2
    3,3
    ```
1. Run `npm start`  
1. Access via http://machineip:port/ login using your Discord account    

## Updating  
1. `git pull`  
1. Run `npm run update` in root folder  
1. Run `npm start`  

## Notes  
If you want to host your images locally where Golem resides, change your `pokemon` and `eggs` image urls to something like the following:  
Pokemon Id is always 3 digits i.e `007`, `047`, `147` although form will be whatever the form number is i.e `12`, `195`, `4032` etc  
```
"images": {
    "pokemon": "https://mygod.github.io/pokicons/v2",
    "eggs": "../img/eggs/%s.png"
},
```

## PM2 (recommended)  
Once everything is setup and running appropriately, you can add this to PM2 ecosystem.config.js file so it is automatically started:  
```
module.exports = {
  apps : [
  {
    name: 'Golem',
    script: 'index.js',
    cwd: '/home/username/Golem/src/',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    out_file: 'NULL'
  }
  ]
};
```
