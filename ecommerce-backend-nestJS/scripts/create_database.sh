#!/bin/sh
# Simple script to create MySQL database using environment variables
mysql -h "$MYSQL_HOST" -P "$MYSQL_PORT" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < "$(dirname "$0")/create_database.sql"
