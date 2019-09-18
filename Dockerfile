FROM mhart/alpine-node:6
VOLUME /tmp
ADD dist /opt/www
ADD run.sh /opt/run.sh
RUN \
apk --no-cache add supervisor openssh git && \
npm install -g pushstate-server && \
npm cache clean && \
rm /etc/supervisord.conf && \
mkdir /root && \
mkdir -p /etc/supervisor/conf.d && \
mkdir -p /var/log/supervisor

COPY supervisord.conf /etc/supervisor/supervisord.conf
ARG VUE_APP_API_HOST
ENV VUE_APP_API_HOST=$VUE_APP_API_HOST
EXPOSE 8080
ENTRYPOINT ["sh","/opt/run.sh"]
CMD ["pushstate-server", "-d", "/opt/www/", "-p", "8080"]
