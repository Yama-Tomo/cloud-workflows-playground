#!/bin/bash

current=$(cd $(dirname $0);pwd)

GCP_PROJECT_ID=$(gcloud config get-value project)

if [ "${GCP_PROJECT_ID}" = "" ]; then
  echo "abort: empty GCP project ID"
  exit 1
fi

for workflow_file in $(ls ${current}/*.yml)
do
  name=$(basename -s .yml "${workflow_file}")
  gcloud workflows deploy ${name} --source=${workflow_file}
done

for name in $(ls -d */ | sed s#/##g)
do
  cd ${current}/${name}
  gcloud builds submit --tag gcr.io/${GCP_PROJECT_ID}/${name}
  gcloud run deploy ${name} --no-allow-unauthenticated --region us-central1 --platform managed --image gcr.io/${GCP_PROJECT_ID}/${name}
done