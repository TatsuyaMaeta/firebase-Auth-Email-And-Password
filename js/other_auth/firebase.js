// https://www.youtube.com/watch?v=iKlWaUszxB4&t=215s

var firebaseConfig = envFirebaseConfig; //envFirebaseConfigは別ディレクトリにあるFirebase用のIDなどの情報の変数

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // ログイン処理に必要な塊を表示
        document.getElementById("user_div").style.display = "block";
        // ログアウト等のログイン後に必要な塊を非表示
        document.getElementById("login_div").style.display = "none";

        var user = firebase.auth().currentUser;
        
        console.dir(user);

        if (user != null) {
            var email_id = user.email;
            document.getElementById("user_para").innerHTML =
                "Welcome User : " + email_id;
        }
    } else {
        // No user is signed in.

        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }
});

function login() {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase
        .auth()
        .signInWithEmailAndPassword(userEmail, userPass)
        .then(console.log(userEmail, userPass))
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.dir(error);
            window.alert("Error : " + errorMessage);
            // ...
        });
}

function logout() {
    firebase.auth().signOut();
}

document
    .getElementById("password_field")
    .addEventListener("keydown", function (e) {
        // console.log(e.metaKey);
        // console.dir(e);

        const downKeyCode1 = e.key; //13 = Enter Key

        if (downKeyCode1 == "Enter") console.log("true!!!!!!!!!");

        // cmdの際はmetaKey == true になる
        if (event.metaKey) {
            if (
                downKeyCode1 == "Enter" &&
                document.getElementById("password_field").value != ""
            ) {
                console.log("Pressed Double Key with command key.");
                
                login();
            }
        }
    });
