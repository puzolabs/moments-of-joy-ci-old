
admin = require("firebase-admin");

process.env.FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"

module.exports = function(callback)
{

  admin.initializeApp({ projectId: "moments-of-joy" });

  admin
  .auth()
  .getUserByEmail("tester@moj.com")
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);

    admin
      .auth()
      .deleteUser(userRecord.uid)
      .then(() => {
        console.log('Successfully deleted user');
        callback(null);
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
        callback(error, null);
      });
    
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
    callback(error.message, null);
  });

}
