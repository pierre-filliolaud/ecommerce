#!/usr/bin/env bash

KEYSPACE_NAME=gateway
cqlsh -f /cql/create-keyspace-prod.cql $CASSANDRA_CONTACT_POINT
cqlsh -k $KEYSPACE_NAME -f /cql/create-tables.cql $CASSANDRA_CONTACT_POINT
