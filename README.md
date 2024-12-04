
<body>
  <h1>Webアプリケーションポートフォリオ</h1>
  
  <blockquote>
    <strong>注意:</strong> リポジトリ内のコードをご利用いただく際に発生したトラブル等については、
    一切責任を負いかねますのでご了承ください。
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
      <a href="https://youtu.be/SGeeLyyds3M"> デモを見る</a>
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
      <a href="https://example.com/household">デモを見る</a>
      <br/>
    </li><br/>
    <li><strong>工夫点 / 挑戦したこと:</strong><br/>
      <ul>
        <li>firebaseを用いたデータベース連携に挑戦</li>
        <li>MUIを用いてシンプルで見やすいデザインに</li>
        <li>スマホ決済といった現在主流の決済手段を追加</li>
      </ul>
    </li><br/>
    <li><strong>使用技術:</strong> React, MUI, TypeScript, Firebase(Firestore Firebase)</li>
    <li><strong>参考:</strong>
      <br/>【『React』×『TypeScrip』入門　】家計簿アプリ作成でReactとTypeScriptの開発方法を学ぼう 
      <br/>URL:https://www.udemy.com/share/10avSW3@kF65KUoL-L4-vMUdLX71riD2wajEqBL6rCXm-ikb6NrMTJhRrtlzxMAUnA4xqmKYkg==/</li>
  </ul><br/>

  <h3>3. Shift-scheduler</h3>
  <ul>
    <li><strong>概要:</strong><br/> 
      <ul>
        <li>シフト作成補助兼管理アプリ。</li>
        <li>シフト作成の際に、紙の希望出勤表からエクセルに手入力していた作業を、Web上でいくつかの情報を打ち込むことで、シフト表のフォーマット通りにテーブル表示し、最短一回の貼り付け作業で入力を終わらせることができるように</li>
        </li>
      </ul>
    <li><strong>機能:</strong>
      <ul>
        <li>スケジュールの作成・編集。</li>
        <li>自動スケジュール生成機能。</li>
        <li>出勤データのエクスポート。</li>
      </ul>
    </li>
    <li><strong>デモ動画:</strong>
      <a href="https://example.com/shift-scheduler">デモを見る</a>
      <br/>
      <img src="https://example.com/shift-demo.gif" alt="Shift Scheduler Demo" width="400" />
    </li>
    <li><strong>使用技術:</strong> React, Express, PostgreSQL</li>
  </ul>

  <h2 id="images">動作イメージ</h2>
  <p><strong>Frogs - カエル化回避！</strong></p>
  <img src="https://example.com/frogs-demo.gif" alt="Frogs Demo" width="400" />
  <p><strong>HouseHold-app</strong></p>
  <img src="https://example.com/household-demo.gif" alt="HouseHold Demo" width="400" />
  <p><strong>Shift-scheduler</strong></p>
  <img src="https://example.com/shift-demo.gif" alt="Shift Scheduler Demo" width="400" />

  <h2 id="technologies">使用技術</h2>
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
        <td>React, TypeScript, Vue.js, TailwindCSS</td>
      </tr>
      <tr>
        <td>バックエンド</td>
        <td>Node.js, Express, Firebase</td>
      </tr>
      <tr>
        <td>データベース</td>
        <td>MongoDB, PostgreSQL</td>
      </tr>
    </tbody>
  </table>

  <h2 id="improvements">今後の改善点</h2>
  <ul>
    <li><strong>Frogs:</strong> ユーザーの選択履歴を元にした詳細なフィードバック機能を追加予定。</li>
    <li><strong>HouseHold-app:</strong> 複数アカウント対応機能を実装。</li>
    <li><strong>Shift-scheduler:</strong> スケジュール通知機能の追加。</li>
  </ul>
</body>
</html>
