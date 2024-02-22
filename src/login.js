const viewPassword = document.getElementById('view-password');
const passwordInput = document.getElementById('password-input');
const usernameInput = document.getElementById('username-input');
const loginBtn = document.getElementById('login-btn');



viewPassword.addEventListener('click', () => {
	const currentType = passwordInput.getAttribute('type');
	if (currentType == 'password') {
		passwordInput.setAttribute('type', 'text');
	} else {
		passwordInput.setAttribute('type', 'password');
	}
});

const users = [
	{
		username: 'pris',
		password: 'pris',
	},
	{
		username: 'poly',
		password: 'poly',
	},
];

loginBtn.addEventListener('click', (event) => {
	event.preventDefault();

	const usernameValue = usernameInput.value;
	const passwordValue = passwordInput.value;

	const userFound = users.find(
		(user) =>
			user.username == usernameValue && user.password == passwordValue
	);

	if (userFound) {
		alert('Logged in');
        localStorage.setItem('isLogged', true);
        window.location.href = '../index.html';
	} else {
		usernameInput.value = '';
		passwordInput.value = '';
		alert('Wrong credentials');
	}
});
