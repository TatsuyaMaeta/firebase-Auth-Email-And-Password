// Firebase Auth をウェブで始めよう！ - Firecasts
// https://www.youtube.com/watch?v=-OKrloDzGpU

(function () {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = envFirebaseConfig; //envFirebaseConfigは別ディレクトリにあるFirebase用のIDなどの情報の変数

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // console.log(firebaseConfig);

    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignUp = document.getElementById("btnSignUp");
    const btnLogOut = document.getElementById("btnLogOut");

    //LogIn event
    btnLogin.addEventListener("click", (e) => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        //Sign In
        //https: firebase.google.com/docs/auth/web/password-auth?hl=ja
        const promise = auth.signInWithEmailAndPassword(email, pass);
        console.log(promise);
        promise.catch((e) => console.log(e.message));
    });

    //Add signup event
    btnSignUp.addEventListener("click", (e) => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        //Sign In
        //https: firebase.google.com/docs/auth/web/password-auth?hl=ja
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch((e) => console.log(e.message));
    });

    btnLogOut.addEventListener("click", (e) => {
        firebase.auth().signOut();
    });

    //Add a realtime listener
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
            console.log(firebaseUser);
            btnLogOut.classList.remove("hide");
        } else {
            console.log("Not Logged In");
            btnLogOut.classList.add("hide");
        }
    });
})();
