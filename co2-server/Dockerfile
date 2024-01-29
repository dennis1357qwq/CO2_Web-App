FROM node:19.3.0

WORKDIR /app
COPY package*.json ./
RUN npm instal
COPY . .

ENV MYSQL_HOST="192.168.2.124"
ENV MYSQL_USER="outside"
ENV MYSQL_PASSWORD="M4q03r4db"
ENV MYSQL_DATABASE="Co2_Center_DB"

EXPOSE 5002
CMD ["npm", "run", "start"]