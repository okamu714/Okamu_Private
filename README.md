
<body>
  <h1>Webアプリケーションポートフォリオ</h1>
  
  <blockquote>
    <strong>注意:</strong> リポジトリ内のコードをご利用いただく際に発生したトラブル等については、
    一切責任を負いかねますのでご了承ください。
  </blockquote>
  <blockquote>
    <strong>お知らせ:</strong> 電子記事販売や就活体験記ブログを投稿するWebアプリケーションを作成いたしました。こちらも合わせてご覧いただけると幸いです。<br/>
    アプリURL:https://authcomp.d1awsv4v0mkqab.amplifyapp.com/<br/>
    Github:https://github.com/okamu714/AnteKnowledgeFrontEnd　(フロントエンド) https://github.com/okamu714/AnteknowledgeBackEnd (バックエンド)
  </blockquote>

  <h2>目次</h2>
  <ol>
    <li><a href="#introduction">はじめに</a></li>
    <li><a href="#apps">厳選Webアプリ一覧</a></li>
    <li><a href="#technologies">使用技術まとめ</a></li>
    <li><a href="#improvements">今後の改善点</a></li>
  </ol>

  <h2 id="introduction">はじめに</h2>
  <p>
    ・本リポジトリはこれまでにokamu714(GitHubName)が作成してきたWebアプリケーション(以後Webアプリ)の詰め合わせとなっています。<br/>
    ・それぞれのWebアプリは異なる目的や技術スタックを用いて構築されており、このREADMEではその中でも特に注目していただきたいWebアプリを厳選して紹介しております。<br/>
  </p>

  <h2 id="apps">厳選Webアプリ一覧</h2>

  <h3>1. Frogs - カエル化回避！</h3>
  <ul>
    <li><strong>概要:</strong> 「恋愛に悩むすべての男性へ、少しのアドバイスを」をテーマにした恋愛シミュレーションクイズゲーム。</li><br/>
    <li><strong>機能:</strong>
      <ul>
        <li>シチュエーション別の4択クイズ（例: 「初めてのデート編」「3回目のデート編」）。</li>
        <li>クイズ結果を元に「カエル化度(こちらで独自に設定した基準)」を算出する機能。</li>
        <li>クイズ結果の確認機能（マイページ）。</li>
      </ul>
    </li><br/>
    <li><strong>デモ動画:</strong>
      <a href="https://youtu.be/SGeeLyyds3M"> デモを見る(YouTubeへのリンクです)</a>
      <br/>
    </li><br/>
    <li><strong>工夫点 / 挑戦したこと:</strong><br/>
      <ul>
        <li>初めてのチーム開発でGitとGitHubの使用に挑戦</li>
        <li>Djangoで用意したデータベースとの連携に挑戦</li>
        <li>細かいアニメーションを入れたり、上品さを感じるトップ画像をAIで生成することでUI/UXの向上を図った</li>
      </ul>
    </li><br/>
    <li><strong>使用技術:</strong> HTML, CSS, JavaScript, Django(環境構成には不参加)</li>
  </ul><br/>

  <h3>2. HouseHold-app</h3>
  <ul>
    <li><strong>概要:</strong> 家計簿管理アプリ。月ごとの支出と収入を可視化し、家計の見直しをサポート。</li><br/>
    <li><strong>機能:</strong>
      <ul>
        <li>カレンダーへの支出・収入の記録。</li>
        <li>円グラフと棒グラフ表示による月ごとの支出可視化。</li>
        <li>Firestore Firebaseでのデータ保存</li>
      </ul>
    </li><br/>
    <li><strong>デモ動画:</strong>
      <a href="https://youtu.be/U_rdJHdrvWw">デモを見る(YouTubeへのリンクです)</a>
      <br/>
    </li><br/>
    <li><strong>工夫点 / 挑戦したこと:</strong><br/>
      <ul>
        <li>firebaseを用いたデータベース連携に挑戦</li>
        <li>MUIを用いてシンプルで見やすいデザインに</li>
        <li>スマホ決済といった現在主流の決済手段を追加</li>
      </ul>
    </li><br/>
    <li><strong>使用技術:</strong> React, MUI, TypeScript, Firebase(Firestore database)</li>
    <li><strong>参考:</strong>
      <br/>【『React』×『TypeScrip』入門　】家計簿アプリ作成でReactとTypeScriptの開発方法を学ぼう 
      <br/>URL:https://www.udemy.com/share/10avSW3@kF65KUoL-L4-vMUdLX71riD2wajEqBL6rCXm-ikb6NrMTJhRrtlzxMAUnA4xqmKYkg==/</li>
  </ul><br/>

  <h3>3. Shift-scheduler</h3>
  <ul>
    <li><strong>概要:</strong><br/> 
      <ul>
        <li>シフト作成補助兼管理アプリ。</li>
        <li>シフト作成の際に、紙の希望出勤表からエクセルに手入力していた作業を、Web上でいくつかの情報を打ち込むことで、シフト表のフォーマット通りにテーブル表示し、最短一回の貼り付け作業で入力を終わらせることができるようにした</li>
      </ul>
    </li><br/>
    <li><strong>機能:</strong>
      <ul>
        <li>一ヶ月分の従業員シフトデータの保存。</li>
        <li>データをもとにシフト作成に使うエクセルフォーマット通りにテーブルを表示</li>
        <li>時間帯あたりの出勤人数が足りていない日は赤く強調表示</li>
      </ul>
    </li><br/>
    <li><strong>デモ動画:</strong>
      <a href="https://youtu.be/aqfUrJ-XeoI">デモを見る(YouTubeへのリンクです)</a>
      <br/>
    </li><br/>
    <li><strong>工夫点 / 挑戦したこと:</strong><br/>
      <ul>
        <li>変更や取得がしやすいデータ階層構造の設計</li>
        <li>制作者と管理権限を持ったアカウントしかシフトデータの参照と編集ができない仕様づくり</li>
        <li>6時間以上の労働時間の場合、休憩時間が加えられていたり、出勤開始時刻を15分起きにしたりといったアルバイト先に合わせた細かい調整</li>
      </ul>
    </li><br/>
    <li><strong>使用技術:</strong> React,  MUI, TypeScript, Firebase(Authentication, Firestore database) </li>
  </ul>

  <h2 id="technologies">使用技術まとめ</h2>
  <table border="1">
    <thead>
      <tr>
        <th>分類</th>
        <th>使用技術</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>フロントエンド</td>
        <td>HTML, CSS, JavaScript, TypeScript(5.5.3), React(18.3.1), MUI(6.1.0)</td>
      </tr>
      <tr>
        <td>バックエンド</td>
        <td>Django(私自身は未使用)</td>
      </tr>
      <tr>
        <td>データベース</td>
        <td>Firebase(10.13.1: Authentication, firestore database)</td>
      </tr>
    </tbody>
  </table><br/>

  <h2 id="improvements">今後の改善点</h2>
  <ul>
    <li><strong>Frogs:</strong> ユーザーのカエル化体験の投稿機能の追加。</li>
    <li><strong>HouseHold-app:</strong> ユーザー認証機能の追加</li>
    <li><strong>Shift-scheduler:</strong> テーブル画面からのデータ編集機能追加。</li>
  </ul><br/>

  <h2 id="improvements">さいごに</h2>
  最後までご覧いただきありがとうございました。<br/>
  どのアプリもデプロイまでには至っていない拙い作品ばかりですが、振り返ってみると意外と思い出深かったりします。<br/>
  このアプリたちを糧にして、今後も成長を続けていければ良いなと考えております。<br/>
  改めてここまでご覧いただきありがとうございました！
  
</body>
</html>
