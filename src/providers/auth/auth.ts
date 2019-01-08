import FireBase from 'firebase';

export class AuthService {

  singup(email: string, password: string) {
    return FireBase.auth().createUserWithEmailAndPassword(email, password);
  }

  singin(email: string, password: string) {
    return FireBase.auth().signInWithEmailAndPassword(email, password);
  }

  singout() {
    FireBase.auth().signOut();
  }

  getCurrentUser() {
    return FireBase.auth().currentUser;
  }

}
