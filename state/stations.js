module.exports = stations

function stations (state, emitter) {
  state.stations = [
    {
        "id": 6,
        "name": "Apomahon",
        "altitude": 150,
        "min_horizon": 25,
        "lat": 38.048444,
        "lng": 23.739312,
        "qthlocator": "KM18ub",
        "location": "",
        "antenna": [
            "UHF Helical",
            "L Helical",
            "VHF Yagi"
        ],
        "created": "2016-01-17T19:28:26Z",
        "last_seen": "2018-04-02T14:18:52Z",
        "status": "Online",
        "observations": 10029,
        "description": "G5500 rotator with SatNOGS g5500 rotator controller, USRP B200mini, Wimo X-Quad VHF and SatNOGS Helical 438-2 UHF"
    },
    {
        "id": 7,
        "name": "Stony",
        "altitude": 65,
        "min_horizon": 25,
        "lat": 37.97034,
        "lng": 23.71394,
        "qthlocator": "KM17ux",
        "location": "",
        "antenna": [
            "VHF Turnstile"
        ],
        "created": "2017-05-04T20:21:09Z",
        "last_seen": "2018-04-02T14:18:15Z",
        "status": "Online",
        "observations": 5367,
        "description": ""
    },
    {
        "id": 12,
        "name": "W2BFJ",
        "altitude": 67,
        "min_horizon": 0,
        "lat": 42.744,
        "lng": -71.538,
        "qthlocator": "FN42fr",
        "location": "",
        "antenna": [
            "VHF Lindenblad",
            "UHF Lindenblad"
        ],
        "created": "2017-06-02T14:29:33Z",
        "last_seen": "2018-04-02T14:18:42Z",
        "status": "Online",
        "observations": 3418,
        "description": "NOTE: During AO-92 commissioning, the UHF station is down, and the VHF is a crossed Yagi tracking AO-85, AO-91, and AO-92"
    },
    {
        "id": 13,
        "name": "OZ9AEC-VHF1",
        "altitude": 48,
        "min_horizon": 20,
        "lat": 55.51,
        "lng": 11.74,
        "qthlocator": "JO55um",
        "location": "",
        "antenna": [
            "VHF Turnstile"
        ],
        "created": "2017-06-10T22:12:33Z",
        "last_seen": "2018-04-02T14:18:35Z",
        "status": "Online",
        "observations": 6212,
        "description": "Airspy R2 connected to Up-board running Ubuntu server 16.04"
    },
    {
        "id": 15,
        "name": "VK5QI-2M",
        "altitude": 8,
        "min_horizon": 20,
        "lat": -34.8463,
        "lng": 138.6949,
        "qthlocator": "PF95id",
        "location": "",
        "antenna": [
            "VHF Turnstile"
        ],
        "created": "2017-07-13T12:38:23Z",
        "last_seen": "2018-04-02T14:18:52Z",
        "status": "Online",
        "observations": 5527,
        "description": ""
    },
    {
        "id": 16,
        "name": "VK5QI-70CM",
        "altitude": 5,
        "min_horizon": 30,
        "lat": -34.721,
        "lng": 138.6928,
        "qthlocator": "PF95ig",
        "location": "",
        "antenna": [
            "UHF Turnstile"
        ],
        "created": "2017-07-15T12:59:11Z",
        "last_seen": "2018-04-02T14:18:54Z",
        "status": "Online",
        "observations": 6824,
        "description": ""
    },
    {
        "id": 21,
        "name": "Avia",
        "altitude": 45,
        "min_horizon": 20,
        "lat": 36.96089,
        "lng": 22.14489,
        "qthlocator": "KM16bx",
        "location": "",
        "antenna": [
            "UHF Turnstile"
        ],
        "created": "2017-09-30T14:16:08Z",
        "last_seen": "2018-04-02T14:18:22Z",
        "status": "Online",
        "observations": 5535,
        "description": ""
    },
    {
        "id": 25,
        "name": "N7IPY",
        "altitude": 50,
        "min_horizon": 15,
        "lat": 38.7708,
        "lng": -121.29,
        "qthlocator": "CM98is",
        "location": "",
        "antenna": [
            "UHF Yagi",
            "VHF Yagi"
        ],
        "created": "2017-10-10T01:49:27Z",
        "last_seen": "2018-04-02T14:18:44Z",
        "status": "Online",
        "observations": 666,
        "description": "This Ground Station Operated from a Raspberry Pi-3B  and an RTLSDR dongle.  The Antennas are both from M2 Antennas.  The Rotor System is provided by Portable Rotation.  The property is on a decline and the antenna location is south of the main house, so signals are blocked to 30 degrees to the North.  Currently there is a pre-Amp on the feed line at the antenna location.  The feedline is 50 Feet of LMR400."
    },
    {
        "id": 27,
        "name": "NB3T - VHF",
        "altitude": 634,
        "min_horizon": 15,
        "lat": 37.194,
        "lng": -80.489,
        "qthlocator": "EM97se",
        "location": "",
        "antenna": [
            "VHF Turnstile"
        ],
        "created": "2017-10-11T22:13:35Z",
        "last_seen": "2018-04-02T14:18:18Z",
        "status": "Online",
        "observations": 1621,
        "description": "Turnstile Antenna, LNA4ALL, NooElec NESDR SMArt"
    },
    {
        "id": 28,
        "name": "NB3T - UHF",
        "altitude": 634,
        "min_horizon": 15,
        "lat": 37.194,
        "lng": -80.489,
        "qthlocator": "EM97se",
        "location": "",
        "antenna": [
            "UHF Turnstile"
        ],
        "created": "2017-10-11T22:17:21Z",
        "last_seen": "2018-04-02T14:18:31Z",
        "status": "Online",
        "observations": 1647,
        "description": "Turnstile Antenna, LNA4ALL, NooElec NESDR SMArt"
    },
    {
        "id": 31,
        "name": "GI7UGV - UHF",
        "altitude": 10,
        "min_horizon": 30,
        "lat": 54.594049,
        "lng": -5.713397,
        "qthlocator": "IO74do",
        "location": "",
        "antenna": [
            "UHF Helical"
        ],
        "created": "2017-10-31T22:42:22Z",
        "last_seen": "2018-04-02T14:18:06Z",
        "status": "Online",
        "observations": 4794,
        "description": "QFH, Preamp/Filter, RTLSDR."
    },
    {
        "id": 32,
        "name": "SV1QZZ - UHF #2",
        "altitude": 208,
        "min_horizon": 10,
        "lat": 38.022,
        "lng": 23.828,
        "qthlocator": "KM18va",
        "location": "",
        "antenna": [
            "UHF Lindenblad"
        ],
        "created": "2017-11-20T05:59:48Z",
        "last_seen": "2018-04-02T14:18:12Z",
        "status": "Online",
        "observations": 5382,
        "description": ""
    },
    {
        "id": 33,
        "name": "G7KSE",
        "altitude": 10,
        "min_horizon": 30,
        "lat": 54.488,
        "lng": -3.588,
        "qthlocator": "IO84el",
        "location": "",
        "antenna": [
            "VHF Turnstile"
        ],
        "created": "2017-11-26T17:50:54Z",
        "last_seen": "2018-04-02T14:18:20Z",
        "status": "Online",
        "observations": 2848,
        "description": "No rotator RPi with NooElec SMArt dongle."
    },
    {
        "id": 35,
        "name": "LA1NGS",
        "altitude": 50,
        "min_horizon": 5,
        "lat": 63.41817,
        "lng": 10.39957,
        "qthlocator": "JP53ek",
        "location": "",
        "antenna": [
            "VHF Turnstile",
            "UHF Turnstile",
            "VHF Helical"
        ],
        "created": "2017-12-16T17:30:41Z",
        "last_seen": "2018-04-02T14:18:33Z",
        "status": "Online",
        "observations": 4360,
        "description": "NTNU Test Satellite (NUTS) Ground Station"
    },
    {
        "id": 37,
        "name": "DL4PD",
        "altitude": 275,
        "min_horizon": 1,
        "lat": 50.749782,
        "lng": 6.216089,
        "qthlocator": "JO30cr",
        "location": "",
        "antenna": [
            "UHF Yagi",
            "VHF Yagi"
        ],
        "created": "2018-01-06T10:04:16Z",
        "last_seen": "2018-04-02T14:18:55Z",
        "status": "Online",
        "observations": 3015,
        "description": "A note for the observations team:\r\n\r\nPlease schedule some DUV-observations with this, and in paralell with the twin-station #190 in dev-network.\r\nSatellites to add in priority 1 will be:\r\n\r\n- https://db.satnogs.org/satellite/40967/\r\n- https://db.satnogs.org/satellite/43137/\r\n- https://db.satnogs.org/satellite/43017/\r\n\r\nDev-station can be found here: \r\n\r\n - https://network-dev.satnogs.org/stations/190/\r\n\r\nThey share the same antennas and tracking is commanded by this production station."
    },
    {
        "id": 38,
        "name": "Technikraum Lanzenhäusern",
        "altitude": 5,
        "min_horizon": 10,
        "lat": 46.83592,
        "lng": 7.35009,
        "qthlocator": "JN36qu",
        "location": "",
        "antenna": [
            "VHF Turnstile"
        ],
        "created": "2018-03-04T10:32:23Z",
        "last_seen": "2018-04-02T14:18:05Z",
        "status": "Online",
        "observations": 541,
        "description": ""
    },
    {
        "id": 43,
        "name": "Grenoble - F4HVX",
        "altitude": 350,
        "min_horizon": 20,
        "lat": 45.2676834,
        "lng": 5.6080818,
        "qthlocator": "JN25tg",
        "location": "",
        "antenna": [
            "UHF Turnstile"
        ],
        "created": "2018-03-11T18:25:37Z",
        "last_seen": "2018-04-02T14:18:28Z",
        "status": "Online",
        "observations": 99,
        "description": "RTLSDR V3 + Quadrifilar Helix       \r\n\r\n[Big mountain on west]"
    },
    {
        "id": 47,
        "name": "DB0RV",
        "altitude": 528,
        "min_horizon": 15,
        "lat": 47.81,
        "lng": 9.589,
        "qthlocator": "JN47tt",
        "location": "",
        "antenna": [
            "VHF Turnstile",
            "UHF Turnstile"
        ],
        "created": "2018-03-22T12:04:12Z",
        "last_seen": "2018-04-02T14:18:37Z",
        "status": "Online",
        "observations": 185,
        "description": ""
    },
    {
        "id": 4,
        "name": "SV1IYO",
        "altitude": 120,
        "min_horizon": 10,
        "lat": 38.024,
        "lng": 23.733,
        "qthlocator": "KM18ua",
        "location": "",
        "antenna": [
            "VHF Turnstile",
            "UHF Turnstile"
        ],
        "created": "2015-10-11T13:59:38Z",
        "last_seen": "2018-04-02T14:18:18Z",
        "status": "Testing",
        "observations": 290,
        "description": ""
    },
    {
        "id": 5,
        "name": "oe6xug",
        "altitude": 370,
        "min_horizon": 10,
        "lat": 47.058979,
        "lng": 15.460038,
        "qthlocator": "HN77rb",
        "location": "",
        "antenna": [
            "UHF Yagi",
            "VHF Yagi"
        ],
        "created": "2015-11-23T12:12:51Z",
        "last_seen": "2018-04-02T14:17:08Z",
        "status": "Testing",
        "observations": 70,
        "description": ""
    },
    {
        "id": 22,
        "name": "Ferns-1",
        "altitude": 229,
        "min_horizon": 40,
        "lat": 43.28,
        "lng": -87.97,
        "qthlocator": "EN63ag",
        "location": "",
        "antenna": [
            "VHF Quadrafilar"
        ],
        "created": "2017-10-08T21:10:41Z",
        "last_seen": "2018-04-02T14:18:43Z",
        "status": "Testing",
        "observations": 3470,
        "description": "Home made QFH antenna, FM band block. Not in a good location, trees on north and houses on south side blocking lot of signals"
    },
    {
        "id": 36,
        "name": "oe8rke",
        "altitude": 1641,
        "min_horizon": 5,
        "lat": 46.839383,
        "lng": 15.011715,
        "qthlocator": "JN76mu",
        "location": "",
        "antenna": [
            "UHF Yagi",
            "VHF Yagi"
        ],
        "created": "2017-12-27T19:36:08Z",
        "last_seen": "2018-04-02T14:18:23Z",
        "status": "Testing",
        "observations": 43,
        "description": "offsite location with low noise"
    },
    {
        "id": 39,
        "name": "CGBSAT-VHF",
        "altitude": 10,
        "min_horizon": 10,
        "lat": 52.8344,
        "lng": 6.3785,
        "qthlocator": "JO32eu",
        "location": "",
        "antenna": [
            "VHF Turnstile"
        ],
        "created": "2018-03-09T17:42:56Z",
        "last_seen": "2018-04-02T14:14:06Z",
        "status": "Testing",
        "observations": 11,
        "description": ""
    },
    {
        "id": 41,
        "name": "Chicago1",
        "altitude": 7,
        "min_horizon": 10,
        "lat": 41.84,
        "lng": -87.64,
        "qthlocator": "EN61eu",
        "location": "",
        "antenna": [
            "HF Dipole"
        ],
        "created": "2018-03-10T23:43:21Z",
        "last_seen": "2018-04-02T13:58:20Z",
        "status": "Testing",
        "observations": 462,
        "description": "Will be moving to Michigan this week end with a proper antenna. Currently most NOAA observations fail so do not attempt them on this station."
    },
    {
        "id": 48,
        "name": "ESAC Ground Station",
        "altitude": 655,
        "min_horizon": 1,
        "lat": 40.4442,
        "lng": -3.9527,
        "qthlocator": "IN80ak",
        "location": "",
        "antenna": [
            "HF Dipole",
            "UHF Yagi",
            "L Helical",
            "VHF Quadrafilar"
        ],
        "created": "2018-03-22T15:19:32Z",
        "last_seen": "2018-04-02T14:18:14Z",
        "status": "Testing",
        "observations": 22,
        "description": ""
    }
  ]

  emitter.on('station:add', function (station) {
    state.stations.push(station)
    emitter.emit('render')
  })
}
