# ======================================================================

# @author: Lucas Vieira <lcssvieira@gmail.com>

# @version: 1.0.0

#

# @description: Dockerfile to build UserAPI

# ======================================================================

FROM node:10.16-alpine


WORKDIR /app


# Copy and install only production dependencies

COPY dist .

COPY package.json .

RUN npm install --production


ENTRYPOINT [ "node", "main.js" ]
