# CO<sub>2</sub> Database Planer

**CO<sub>2</sub> Database Planer** is a tool for planning and simulating the carbon intensity of datacenters in the United Kingdom. Depending on the location of the datacenter it will show the current generation mix and forecast the carbon intensity for the next 24 hours.

## Getting Started

Clone the most recent version of this repository and make sure to have atleast Node.js Version 18.15.0 installed.

### Set up a local MySQL database

Create a local Database according to the "schema.sql" file in the "CO2_WEB-APP/co2-server" subdirectory and create a local ".env" file in this directory with the following input and run the MySQL Server.

```
MYSQL_HOST="127.0.0.1"
MYSQL_USER="{your username}"
MYSQL_PASSWORD="{your password}"
MYSQL_DATABASE="Co2-Center_DB"
```

### Run Server and Client

Make sure to install the dependencies of the server and client by running 
```
npm install
```
in the corresponding subdirectories.
After that you are able to start the server and client by running 
```
npm run dev
```
in both subdirectories.

### Usage

Access the Application via the localhost link.
After a successful register and login you can start using the Application by creating your first datacenter.
Make sure to enter a correct adress in the United Kingdom since the used [Carbon Intensity API](https://carbonintensity.org.uk/) is limited to that.
