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