let token = '';
const API_URL = 'http://localhost:3000/api';

/**
 * ログイン処理
 */
function login() {
  const loginEmail = document.getElementById('loginEmail').value;
  const loginPassword = document.getElementById('loginPassword').value;
  if (loginEmail === '' || loginPassword === '') return;

  fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        token = data.token;
        displayToken();
      } else {
        alert(data.message);
      }
    })
    .catch(err => console.log(err));
}

/**
 * ログアウト処理
 */
function logout() {
  token = '';
  displayToken();
}

/**
 * Tokenを表示
 */
function displayToken() {
  const showToken = document.getElementById('showToken');
  showToken.innerHTML = token;
}

function readData() {
  const list = document.getElementById('dataList');
  list.innerHTML = '';

  fetch(`${API_URL}/todos`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.todos) {
        const todos = data.todos;
        for (const todo of todos) {
          list.innerHTML += `<li>${todo.id} ${todo.text}</li>`;
        }
      } else {
        alert(data.message)
      }
    })
    .catch(err => console.log(err))
}
