FROM node:16-alpha

VOLUME /app/src/uploads

WORKDIR /app

ENV COUCHDB_USER admin
ENV COUCHDB_PASSWORD password

COPY . /app/

RUN npm install

EXPOSE $PORT

CMD ["npm", "start"]