


echo "Starting development environment"
docker-compose down && docker-compose up --detach

sleep 3s
echo "rs.initiate()" | mongo &&
echo "Everything is set, attaching to web!" &&
docker attach server_web_1
