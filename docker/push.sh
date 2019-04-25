#!/bin/bash

echo "Pushing synbiohub/igem-plugin:snapshot"

docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
docker push synbiohub/igem-plugin:snapshot
