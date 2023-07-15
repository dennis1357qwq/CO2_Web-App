# CO<sub>2</sub> Database Planer

**CO<sub>2</sub> Database Planer** is a tool for planning or simulating the carbon intensity of datacenters in the United Kingdom. Depending on the location of the datacenter it will show the current generation mix and forecast the carbon intensity for next 24 hours.

## Getting Started

Clone to most recent version of this repository.

### Set up a local MySQL database

Create a local Database according to the "schema.sql" file in the "CO2_WEB-APP/co2-server" subdirectory and create a local ".env" file in this directory with the following input and run the MySQL Server

```
MYSQL_HOST="127.0.0.1"
MYSQL_USER="{your username}"
MYSQL_PASSWORD="{your password}"
MYSQL_DATABASE="Co2-Center_DB"
```

### Run Server and Client
