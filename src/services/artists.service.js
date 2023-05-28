<<<<<<< HEAD
import firebase from "../firebase";

const db = firebase.collection("/artists");

class ArtistsDataService {
  getAll() {
    return db;
  }

  create(artist) {
    return db.add(artist);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}
const inst=new ArtistsDataService();
export default inst;
=======
import firebase from "../firebase";

const db = firebase.collection("/artists");

class ArtistsDataService {
  getAll() {
    return db;
  }

  create(artist) {
    return db.add(artist);
  }

  update(id, value) {
    return db.doc(id).update(value);
  }

  delete(id) {
    return db.doc(id).delete();
  }
}

const inst=new ArtistsDataService();
export default inst;
>>>>>>> 230f63d8422c8f5dc5c6fd2bad7a1b0ac9af9dce
