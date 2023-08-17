# we only put dist folder into docker, so minimal docker size

FROM keymetrics/pm2:18-alpine
COPY . .
# install prod only
RUN npm i --omit=dev
RUN npx prisma generate
# RUN ls -al -R
# CMD npm run start:prod
CMD ["pm2-runtime", "start", "pm2.json"]
EXPOSE 3001
