const admin = require('firebase-admin');

const serviceAccount = require('./moments-of-joy-firebase-adminsdk-n4yhw-836f17ca1d.json');

admin.initializeApp({ projectId: "dummy-project-id" });


const db = admin.firestore();





async function deleteCollection(db, collectionPath, batchSize) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }
  
async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        // When there are no documents left, we are done
        resolve();
        return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(db, query, resolve);
    });
}


deleteCollection(firestore, "projects", 10);

//if(location.hostname === 'localhost') {
//  var auth = firebase.auth();
//  auth.useEmulator("http://localhost:9099");
//}


