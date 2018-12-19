#!/bin/bash
#
# quick-n-dirty build script
# buildDocker.sh digimarc/whalerator 0 1 2

major=$1
release="$1.$2"
revision="$1.$2.$3"

repo=$4

hash=`git rev-parse HEAD | cut -c 1-5`

if [ -z "$(git status --porcelain)" ]; then 
  echo "Working directory clean, HEAD $hash"
else 
  echo 'Working directory dirty; commit changes before pushing a release'
  exit -1
fi

echo "Preparing to build and release version $revision ($hash)"

# make sure build tools are up-to-date
docker pull microsoft/aspnetcore:2.0
docker pull microsoft/aspnetcore-build:2.0

# build
docker build . -t $repo:$revision --build-arg SRC_HASH=$hash --build-arg RELEASE=$revision
docker tag $repo:$revision $repo:$release
#docker tag $repo:$revision $repo:$major
docker tag $repo:$revision $repo:latest

# push
docker push $repo:$revision
docker push $repo:$release
#docker push $repo:$major
docker push $repo:latest

echo -n "Done"; read