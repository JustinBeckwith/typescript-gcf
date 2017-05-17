exports.authTest = function (event, callback) {
  const google = require('googleapis');

  google.auth.getApplicationDefault(function (err, authClient, projectId) {
    if (err) {
      callback(err);
    }

    console.log(`projectID ${projectId}`)

    console.log(`authClient.createScopedRequired ${authClient.createScopedRequired}`)

    // The createScopedRequired method returns true when running on GAE or a local developer
    // machine. In that case, the desired scopes must be passed in manually. When the code is
    // running in GCE or a Managed VM, the scopes are pulled from the GCE metadata server.
    // See https://cloud.google.com/compute/docs/authentication for more information.
    if (authClient.createScopedRequired && authClient.createScopedRequired()) {
      // Scopes can be specified either as an array or as a single, space-delimited string.
      authClient = authClient.createScoped([
        'https://www.googleapis.com/auth/compute'
      ]);

       console.log('Created scoped client');
    }

     console.log('Did not create scoped client');

      const cloudfunctions = google.cloudfunctions({
        version: 'v1beta2',
        auth: authClient
      });

     cloudfunctions.projects.locations.functions.list({
       'project': projectId,
       'location': 'us-central1',
       auth:authClient
     }, callback);
  });
}