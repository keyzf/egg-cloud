FROM node:12.13.1
RUN mkdir -p /home/egg-cloud/
WORKDIR /home/egg-cloud/
ADD . /home/egg-cloud
RUN npm install cnpm -g \
    && cnpm i
EXPOSE 7001
