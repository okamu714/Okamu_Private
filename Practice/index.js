// ボタンを押すと色が変化する
const bgButton = function () {
  // rgba表示
  // const r = Math.floor(Math.random() * 255);
  // const g = Math.floor(Math.random() * 255);
  // const b = Math.floor(Math.random() * 255);
  // const randomColor = `rgb(${r},${g},${b})`;

  // カラーコード表示
  const r = Math.floor(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');
  const g = Math.floor(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');
  const b = Math.floor(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');
  const randomColor = `#${r}${g}${b}`;

  document.querySelector('.bgColor').style.backgroundColor = randomColor;
  document.querySelector('.colorCode').textContent = randomColor;
};
document.querySelector('.button-bgColor').addEventListener('click', bgButton);

// プラスXされる
let Inc = Number(document.querySelector('#inc').textContent);
{
  const plus = function () {
    Inc++;
    document.querySelector('#inc').textContent = `${Inc}`;
  };
  document.querySelector('.plus').addEventListener('click', plus);

  const plus100 = function () {
    Inc += 100;
    document.querySelector('#inc').textContent = `${Inc}`;
  };
  document.querySelector('.plus-100').addEventListener('click', plus100);

  const plus1M = function () {
    Inc += 1000000;
    document.querySelector('#inc').textContent = `${Inc}`;
  };
  document.querySelector('.plus-1M').addEventListener('click', plus1M);
}

// マイナスXされる
{
  const minus = function () {
    Inc--;
    document.querySelector('#inc').textContent = `${Inc}`;
  };
  document.querySelector('.minus').addEventListener('click', minus);

  const minus100 = function () {
    Inc -= 100;
    document.querySelector('#inc').textContent = `${Inc}`;
  };
  document.querySelector('.minus-100').addEventListener('click', minus100);

  const minus1M = function () {
    Inc -= 1000000;
    document.querySelector('#inc').textContent = `${Inc}`;
  };
  document.querySelector('.minus-1M').addEventListener('click', minus1M);
}

// リセット
const reset = function () {
  Inc = 0;
  document.querySelector('#inc').textContent = `${Inc}`;
};
document.querySelector('.reset').addEventListener('click', reset);

// サイドバー型メニュー
document.getElementById('menu-toggle').addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open'); // サイドバーの開閉を切り替える
});

/* 文字がその場で強調表示 */
document.querySelector('.input').addEventListener('input', function () {
  document.querySelector('#input').textContent = this.value;
});

// お気に入り登録
let favorites = [];

document.querySelectorAll('.allPicButton').forEach((button) => {
  button.addEventListener('click', function () {
    const item = this.previousElementSibling; // ボタンの前の要素 (画像)
    const itemSrc = item.src; // 画像のURL

    // お気に入りリストにすでに追加されているかチェック
    if (!favorites.some((fav) => fav.src === itemSrc)) {
      // お気に入りリストに追加
      favorites.push({ src: itemSrc });
      updateFavoritesList(); // お気に入りリストを更新
      // ボタンのスタイルを変更
      this.textContent = '登録済み';
      this.classList.add('added');
    }
  });
});

function updateFavoritesList() {
  const favoritesPic = document.querySelector('.favPic');
  favoritesPic.innerHTML = ''; // リストをクリア

  favorites.forEach((fav) => {
    const div = document.createElement('div');
    div.classList.add('favPicBox');
    div.innerHTML = `<img src="${fav.src}" id='favimg'><button class="deleteButton">お気に入り解除</button>`; // 代替テキストをリストアイテムとして表示
    favoritesPic.prepend(div);

    div.querySelector('.deleteButton').addEventListener('click', function () {
      document.querySelectorAll('img').forEach((img) => {
        if (img.src === fav.src) {
          const button = img.nextElementSibling;
          if (button && button.tagName === 'BUTTON') {
            button.textContent = 'お気に入り登録';
            button.classList.remove('added');
          }
        }
      });
      favorites = favorites.filter((favorite) => favorite.src !== fav.src);

      updateFavoritesList();
    });
  });
}

// フォーム

document.getElementById('myForm').addEventListener('submit', function (event) {
  event.preventDefault(); // フォームが送信されるのを防止

  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let message = '';
  // 名前のバリデーション
  if (name === '') {
    message += '名前は必須です。';
  }

  // メールのバリデーション
  if (email === '') {
    message += 'メールアドレスは必須です!!';
  } else if (!email.includes('@')) {
    message += 'メールアドレスは有効なメールアドレスである必要があります。 ';
  }

  // パスワードのバリデーション
  if (password === '') {
    message += 'パスワードは必須です!!';
  } else if (password.length < 6) {
    message += 'パスワードは最低６文字以上でえす。 ';
  }

  if (message === '') {
    document.getElementById('message').textContent =
      'Form submitted successfully!';
    document.getElementById('message').style.color = 'green';
  } else {
    document.getElementById('message').textContent = message;
    document.getElementById('message').style.color = 'red';
  }
});

document.getElementById('formClear').addEventListener('click', function () {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('message').textContent = '';
});

// ホバーすると画像変化
document.querySelectorAll('.picture img').forEach((img) => {
  img.addEventListener('pointerenter', function () {
    this.dataset.original = this.src; // 元の画像パスを保存
    this.src = this.dataset.hover; // ホバー時の画像に切り替え
  });

  img.addEventListener('pointerleave', function () {
    this.src = this.dataset.original; // 元の画像に戻す
  });
});

// toDoリスト
let currentId = 1;
document
  .querySelector('.toDoForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const toDoText = document.querySelector('#toDoText').value;

    const toDoList = document.querySelector('.toDoList tbody');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const td = document.createElement('td');
    th.textContent = `見出し`;
    td.textContent = toDoText;
    tr.appendChild(th);
    tr.appendChild(td);
    toDoList.appendChild(tr);

    document.getElementById('toDoText').value = '';

    th.textContent = currentId;
    currentId++;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.addEventListener('click', function () {
      tr.remove();
      removeTaskFromLocalStorage(text);
    });
    td.prepend(deleteButton);

    td.addEventListener('click', function () {
      td.classList.toggle('completed');
      toggleTaskStatusInLocalStorage(text);
    });
  });
