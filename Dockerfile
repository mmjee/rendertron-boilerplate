FROM node:lts AS compiled

WORKDIR /app
COPY your-app-here/ .

# Add your ENV stuff here

RUN yarn install
RUN yarn build

FROM node:lts

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY index.js ./

RUN yarn install
EXPOSE 80
COPY --from=compiled /app/dist /app/frontend
CMD ["node", "index.js"]
