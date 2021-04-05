GitHub へアップロードしてはいけない API キー等がある場合に
ファイルを別ディレクトリに切り分けておいくことで、
何度も削除して上げ直し等をしなくてもいい

要注意!!!  
ブラウザ上で表示させて確認する際は
ファイルをブラウザへのドラッグ&ドロップでする事。  
VSCodeからの[ブラウザで開く]では表示できない。
その場合はlocalhostが決まってしまい、  
そのディレクトリから外のディレクトリ及びファイルにはアクセスできない  


<ディレクトリ構成>
.  
│   
├─ env  
│  └── env_firebase_Auth  
│      └── env.js  
└── firebase_Auth  
     ├── css  
     │   ├── reset.css  
     │   └── style.css  
     ├── images   
     ├── index.html  
     ├── js  
     │   ├── firebase.js    
     │   └── app.js  
     └── readme.md  

README.md の書き方  
https://codechord.com/2012/01/readme-markdown/
