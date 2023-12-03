<p align="center">
  <a href="https://github.com/DAWN-LV/aqm-backend" target="blank">
    <img src="https://github.com/DAWN-LV/aqm-backend/raw/master/src/common/images/Logo.png?raw=true" width="250" alt="AtmoSense Logo" />
  </a>
</p>

<details>
  <summary>
    <h2>Projekta modelis</h2>
  </summary>

  <p align="center">
    <a href="https://lucid.app/lucidchart/f50687e3-ca8d-4006-92a6-79743d0dfecf/edit?view_items=Xv1Sjn5sZt9H&invitationId=inv_160e4e53-1fce-4aa5-a0ea-1828c28fd23f" target="blank">
      <img src="https://github.com/DAWN-LV/aqm-backend/raw/master/src/common/images/Model.png?raw=true" width="800" alt="Modelis"/>
    </a>
  </p>
</details>

## Language
- [English](README.md)
- [Latvian](README.lv.md)
- [Russian](README.ru.md)

## Projekta apraksts
Projekts "atmo-sense-backend" ir aizmugurējais pielikums, kas izstrādāts, izmantojot [Nest.js](https://github.com/nestjs/nest) pamatu. Šis pielikums ir paredzēts mijiedarbībai ar priekšējo daļu, darbam ar datu bāzi un pieslēgšanās Raspberry Pi sensoriem.

## Projekta funkcijas
- RESTful API mijiedarbībai ar priekšējo daļu.
- Izvēlētas datu bāzes (piemēram, PostgreSQL, MongoDB, MySQL) izmantošana datu uzglabāšanai.
- Raspberry Pi sensoru pieslēgšana un mijiedarbība datu apkopošanai.
- Viegli paplašināma lietotnes arhitektūra pateicoties Nest.js.

## Prasības
Lai sāktu darbu, jums jābūt instalētām šādām sastāvdaļām:

- [Node.js](https://nodejs.org/en) (ieteicama LTS versija)
- [npm](https://www.npmjs.com/) (instalējas kopā ar Node.js)
- [Nest.js](https://nestjs.com/)
- [InfluxDB](https://www.influxdata.com/)
- Raspberry Pi

## Instalācija
Noklonējiet repozitoriju:

```bash
$ git clone https://github.com/DAWN-LV/atmo-sense-backend.git
$ cd jūsu-projekts
```

Instalējiet nepieciešamās atkarības:

```bash
$ npm install
```

## Konfigurācija
Izveidojiet .env failu projekta saknē un norādiet nepieciešamos uzstādījumus, piemēram, datu bāzes parametrus un Raspberry Pi pieslēgšanas iestatījumus.

Piemēra .env fails:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=jūsu_lietotājvārds
DB_PASSWORD=jūsu_parole
```

## Palaišana
Sāciet aizmugurējo serveri ar šādu komandu:

```bash
$ npm run start
```

Pēc noklusējuma serveris tiks palaišanas portā 3000.

## Mūsu projekti

- [Frontend](https://github.com/DAWN-LV/aqm-frontend)
- [Raspberry pi client](https://github.com/PepeWarrior69/aqm-sensor-client)

## Kontakti
Ja jums ir jautājumi vai priekšlikumi, droši sazinieties ar mums:

- Email: vitalijs.pankovs@gmail.com
- GitHub profils: [GitHub](https://github.com/DAWN-LV)
