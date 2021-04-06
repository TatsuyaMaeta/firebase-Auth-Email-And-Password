// https://www.youtube.com/watch?v=iKlWaUszxB4&t=215s

var firebaseConfig = envFirebaseConfig; //envFirebaseConfigは別ディレクトリにあるFirebase用のIDなどの情報の変数

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.auth()のメソッド一覧
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth

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

            var e = checkErrorDetail(error.code);
            // console.log(e);
            var errorCode = error.code;
            var errorMessage = error.message;
            // console.dir(error);
            window.alert("エラー : " + e);
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

function checkErrorDetail(error) {
    switch (error) {
        case "auth/cancelled-popup-request":
        case "auth/popup-closed-by-user":
            return null;
        case "auth/email-already-in-use":
            if (method.indexOf("signup") !== -1) {
                return "このメールアドレスは使用されています";
            } else {
                return "メールアドレスまたはパスワードが違います";
            }
        case "auth/invalid-email":
            return "メールアドレスが正しくありません";
        case "auth/user-disabled":
            return "サービスの利用が停止されています";
        case "auth/user-not-found":
            return "メールアドレスまたはパスワードが違います";
        case "auth/user-mismatch":
            if (method === "signin/popup") {
                return "認証されているユーザーと異なるアカウントが選択されました";
            } else {
                return "メールアドレスまたはパスワードが違います";
            }
        case "auth/weak-password":
            return "パスワードは6文字以上にしてください";
        case "auth/wrong-password":
            return "メールアドレスまたはパスワードが違います";
        case "auth/popup-blocked":
            return "認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください";
        case "auth/operation-not-supported-in-this-environment":
        case "auth/auth-domain-config-required":
        case "auth/operation-not-allowed":
        case "auth/unauthorized-domain":
            return "現在この認証方法はご利用頂けません";
        case "auth/requires-recent-login":
            return "認証の有効期限が切れています";
        default:
            if (method.indexOf("signin") !== -1) {
                return "認証に失敗しました。しばらく時間をおいて再度お試しください";
            } else {
                return "エラーが発生しました。しばらく時間をおいてお試しください";
            }
    }
}
