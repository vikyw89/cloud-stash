# we only put dist folder into docker, so minimal docker size

FROM keymetrics/pm2:18-slim
COPY . .
# install prod only
RUN npm i --omit=dev
RUN npx prisma generate
RUN npm install pm2@latest -g
# CMD npm run start:prod
CMD ["pm2-runtime", "start", "pm2.json"]
EXPOSE 4000
