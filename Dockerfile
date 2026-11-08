FROM node:24

WORKDIR /app/website

EXPOSE 3000
COPY ./website/package.json ./website/package-lock.json /app/website/
RUN npm ci
COPY ./website-docs /app/website-docs
COPY ./website /app/website

CMD ["npm", "start", "--", "--host", "0.0.0.0"]
