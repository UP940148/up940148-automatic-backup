const { GoogleAuth } = require('google-auth-library');

// Could potentially turn BUCKET_NAME into environment variable, or could add as URL parameter
const BUCKET_NAME = 'gs://sign-off-4-bucket';

exports.runBackup = async (req, res) => {
  try {
    // Get auth details
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/cloud-platform',
    });
    const client = await auth.getClient();
    const projectId = await auth.getProjectId();

    // Send POST request to datastore
    const response = await client.request({
      method: 'POST',
      url: `https://datastore.googleapis.com/v1/projects/${projectId}:export`,
      data: {
        outputUrlPrefix: BUCKET_NAME,
      },
    });
    // Send response data back to client
    res.send(response.data);
  } catch (e) {
    // If an error occurs, log and respond
    console.error(e);
    res.sendStatus(500);
  }
};
