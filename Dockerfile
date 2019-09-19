FROM mhart/alpine-node:5.7.1

VOLUME /tmp
RUN npm install -g spa-http-server
ADD dist /opt/www
ADD run.sh /opt/run.sh
ARG VUE_APP_API_HOST
ENV VUE_APP_API_HOST=$VUE_APP_API_HOST
EXPOSE 8080
ENTRYPOINT ["sh","/opt/run.sh"]