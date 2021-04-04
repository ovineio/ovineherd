#!/bin/sh


while true; do
mysql=`ps aux | grep  /usr/sbin/mysqld   | grep -v grep`
echo $mysql
if [ ! "$mysql" ]; then
/etc/init.d/mysql start 
sleep 10
fi

server=`ps aux | grep /mnt/uniappadmin/base_service/main  | grep -v grep`
echo $server
if [ ! "$server" ]; then
nohup  /mnt/uniappadmin/base_service/main -c 1 &
sleep 10
fi

sleep 5
done

