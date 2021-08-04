# Contributing

Thanks for your contributions🙏  
Any contribution to this project is more than welcome🚀

開発に参加する場合は、本文書をお読みください。

## Reporting Issues

新機能の提案や、不具合の報告は Issues に記載してください。

重複を避けるため、既に存在している Issue がないか確認をおねがいします。また、複数の問題がある場合は、それぞれ個別に追加してください。

## Pull Requests

単純な誤字や小さな変更でも、プルリクエストは大歓迎です！

[コントリビューター行動規範](./CODE_OF_CONDUCT.md) に反する内容を含むプルリクエストは受け入れておりません。

### Getting Started

開発を開始するには、以下の手順で準備を行ってください。

0. [Node.js](https://nodejs.org/) をインストールします。
1. 本リポジトリを [Fork](https://docs.github.com/ja/github/getting-started-with-github/fork-a-repo) し、ローカルへ [clone](https://docs.github.com/ja/github/creating-cloning-and-archiving-repositories/cloning-a-repository) します。
2. `yarn` を実行し、必要なパッケージをインストールします。
3. `yarn dev` を実行して開発を開始します！

### Directry Structure

主なディレクトリは以下のとおりです。

- **src**: ソースコードをいれます。
- **scripts**: 開発時に実行するスクリプトをいれます。

### Commit

コミットメッセージの規約として [Conventionaal Commits](https://www.conventionalcommits.org/) を採用しています。以下ルールに従って、コミットメッセージを記述してください。

- 1行目には概要を記述します。
  - 先頭に「型」「: （コロン + 半角スペース）」をいれ、その後ろに概要を記述します。
- 2行目には空行をいれます（本文を記述しない場合は不要）。
- 3行目以降には本文を記述します。省略できます。

1行目に記述する「型」には以下のものが許可されています。  
選択に困る場合は、とりあえず `chore` を使用します。複数当てはまる場合は、可能な限り複数のコミットに分割するようにしてください。

- **feat**: 新しい機能の追加。
- **fix**: 不具合の修正。（小さな変更は chore を使用）
- **docs**: ドキュメントの更新。
- **perf**: パフォーマンスの改善。
- **refactor**: リファクタリング。機能に変化のない修正。
- **style**: コードスタイルの変更。スペースやインデントの調整や Lint エラーの修正。
- **build**: ビルドに関連する変更。
- **ci**: CIに関連する変更。
- **test**: テストに関連する変更。
- **revert**: コミットの取り消し。
- **chore**: その他の変更。 typo の修正などの小さな変更。

以下はコミットメッセージの例です。

```
feat: 〇〇機能の新規追加

〇〇の機能を実装し追加しました。

Fixes #3
```

詳しいルールについては [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) をご確認ください。

### Linting

コードの書き方を統一するため、 [ESLint](https://eslint.org/) と [stylelint](https://stylelint.io/) を使用しています。変更をコミットする前に `npm run lint` を実行してエラーとならないことを確認してください。  
[Visual Studio Code](https://code.visualstudio.com/) を使用している場合は、拡張機能を追加することをおすすめします。

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
