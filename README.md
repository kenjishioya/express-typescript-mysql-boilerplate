# express-typescript-mysql-boilerplate

Node.jsでのバックエンドのボイラープレートです。  
Typescriptを使用し、MySQLに接続します。

## ツール・フレームワークなど
 - [**Typescript**](https://www.typescriptlang.org/)
 - [**Express**](https://expressjs.com/)
 - [**routing-controllers**](https://github.com/typestack/routing-controllers): アノテーションでルーティングが可能です。  
 - [**Typeorm**](https://typeorm.io/#/): DBへのクエリの発行をシンプルにし、コードからテーブルを構築できます。
 - [**Winston**](https://github.com/winstonjs/winston): コンソール、log/以下にログファイルの出力を設定済みです。
 - [**TypeDI**](https://github.com/typestack/typedi): DIによりコードがスッキリし単体テストを簡単にします。  
   
<br>

# サンプルコードの起動
DockerでMySQL環境を構築し、サンプルデータ([KaggleのTitanic: Machine Learning from Disaster](https://www.kaggle.com/rashigoel/titanic-machine-learning-from-disaster))からテーブルを作成し、データを検索するAPIを起動します。

### ★ 環境設定
.env.exampleファイルをコピーして.envファイルをルート以下においてください。

### ★ MySQL環境構築
1. DockerでMySQL環境作成  
```
docker-compose up
```

2. テーブル作成
Typeormのマイグレーション機能でテーブルを作成します。
```
yarn install
yarn ts-node node_modules/.bin/typeorm migration:run
```

ここまででサンプルデータ用のtitanicテーブルが作成されます。

### ★ API起動
以下のコマンドでAPIが起動できます。
```
yarn dev
```

以下のrequestでサンプルデータをMySQLに保存します。
```
GET
http://localhost:4000/api/titanic/importSampleData

request header: {
    key: apikey
}
```
※APIKeyでバリデーションをしているので上記のrequest headerを追加するか、  
src/api/controllers/TitanicController.ts
10行目の@Authrizationを削除してください。

データが作成されたら以下のリクエストなどが可能です。
```
GET
http://localhost:4000/api/titanic

request header: {
    key: apikey
}
```

# メモ
- テストコードが未実装。
- nodeのdocker環境が動作確認できていない。
- lint、prettierなどを設定したい。
- npsを設定してマイグレーションなどをスクリプトで行えるようにしたい。
