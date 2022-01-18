# up940148-automatic-backup

This repository contains the system necessary to automate the backup of your datastore.

## Installation

To install this into a VM instance, first install Node and Git, then clone this repository.

```sh
# Install Node and Git
curl -fsSL https://deb.nodesource.com/setup_17.x | sudo bash -
sudo apt-get install -y nodejs
sudo apt-get install -y git

# Clone repository
git clone https://github.com/UP940148/up940148-automatic-backup
cd up940148-automatic-backup

# Install Repository Dependencies
npm install
```

## Deployment

Deploy the cloud function using

```sh
gcloud functions deploy runBackup --runtime nodejs12 --trigger-http --allow-unauthenticated --service-account datastore-backup@sse2021-332216.iam.gserviceaccount.com
```

Then create the scheduled job using

```sh
gcloud scheduler jobs create http scheduled-backup --schedule "* * * * *" --uri *FUNCTION_URI* --http-method GET
```

To later delete the cloud function and scheduled job, run

```sh
gcloud functions delete runBackup
gcloud scheduler jobs delete scheduled-backup
```
