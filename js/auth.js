const USER_DATA = [
  { email: 'dbwldhkd01@codeit.com', password: "sh413929^^", nickname: "초록거북" },
  { email: 'codeit2@codeit.com', password: "codeit202!", nickname: "코딩이2" },
  { email: 'codeit3@codeit.com', password: "codeit303!", nickname: "코딩이3" },
  { email: 'codeit4@codeit.com', password: "codeit404!", nickname: "코딩이4" },
  { email: 'codeit5@codeit.com', password: "codeit505!", nickname: "코딩이5" },
  { email: 'codeit6@codeit.com', password: "codeit606!", nickname: "코딩이6" },
];

function registerUser(email, password, nickname) {
  const users = JSON.parse(localStorage.getItem('users')) || USER_DATA;

  if (users.some(u => u.email === email)) {
    alert('사용중인 이메일입니다');
    return false;
  }

  const newUser = { email, password, nickname };
  USER_DATA.push(newUser);
  localStorage.setItem('users', JSON.stringify(USER_DATA));
  console.log('회원가입 완료:', newUser);
  console.log('전체 사용자:', USER_DATA);
  return true;
}

function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || USER_DATA;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  }
  return false;
}

function logoutUser() {
  localStorage.removeItem('currentUser');
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

function getAllUsers() {
  return JSON.parse(localStorage.getItem('users')) || USER_DATA;
}
