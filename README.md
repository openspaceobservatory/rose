# rose
.- -.. .- ... - .-. .- .-. . . .-. .- ...

## Install
Tested on Node v8.9.0.

```
$ git clone https://github.com/openspaceobservatory/rose
$ cd rose
$ npm install
```

## Run
```
$ npm start
```

`bankai` will spin up a local development server at `https://localhost:8080` (note: `https` instead of `http`).

When visiting the URL, if you are shown a warning, follow your browser's instructions to add a certificate exception in order to proceed.

## Notes

### Databases
- [https://db.satnogs.org/](https://db.satnogs.org/) - Satellite database
- [https://network.satnogs.org/stations/](https://network.satnogs.org/stations/) - Ground station database
- [https://network.satnogs.org/observations/](https://network.satnogs.org/observations/) - Observations database

### API Explorer
- [https://network.satnogs.org/api/observations/](https://network.satnogs.org/api/observations/)
- [https://network.satnogs.org/api/observations/?future=0&good=1&bad=0&unvetted=1&failed=0&norad=28654&observer=&station=](https://network.satnogs.org/api/observations/?future=0&good=1&bad=0&unvetted=1&failed=0&norad=28654&observer=&station=)

### JSON API
- [https://db.satnogs.org/api/satellites/7530/?format=json](https://db.satnogs.org/api/satellites/7530/?format=json)
- [https://network.satnogs.org/api/observations/7530/?format=json](https://network.satnogs.org/api/observations/7530/?format=json)
