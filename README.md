# up940148-automatic-backup

This repository contains the system necessary to automate the backup of your Google Cloud datastore.

This system is designed to be deployed into a Google Cloud project.

## Setup

### Installing Git

First ensure that Git is installed on the system you're using, you can check this by running:

```sh
git --version
```

If Git isn't installed, you should install it using:

```sh
sudo apt-get install -y git
```

### Getting repository

Once you've got Git installed, clone the contents of this repository into your project.

```sh
# Clone repository
git clone https://github.com/UP940148/up940148-automatic-backup
cd up940148-automatic-backup
```

## Deployment

Deploy the cloud function using:

```sh
gcloud functions deploy runBackup --runtime nodejs12 --trigger-http --allow-unauthenticated --service-account *SERVICE_ACCOUNT_EMAIL*
```

Where `*SERVICE_ACCOUNT_EMAIL*` is the unique email address generated for the service account you're using to deploy the function.

Once the cloud function has been deployed, the console will give you a url to trigger the backup function. This will be under `httpsTrigger: -> url:`. Because this cloud function is triggered with the http `GET` method, navigating to this url in your browser will manually trigger the backup.

To schedule the backup to run automatically, you need to set up a cloud scheduled job using the following.

```sh
gcloud scheduler jobs create http *JOB_NAME* --schedule "* * * * *" --uri *UNIQUE_URL* --http-method GET
```

Where `*JOB_NAME*` is a name you want to use to identify this specific job (Must be unique).

And `*UNIQUE_URL*` is the unique url of your cloud function.

This job is scheduled to run every minute, to change this schedule, simply replace the `* * * * *` with any Cron time string.

## Removal

To delete the scheduled job, run

```sh
gcloud scheduler jobs delete *JOB_NAME*
```

To delete the cloud function, run

```sh
gcloud functions delete runBackup
```
