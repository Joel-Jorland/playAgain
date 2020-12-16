const login = () => {
  const loginDiv = document.getElementById("login_div");
  const loginId = document.getElementById("login_id").value;
  loginDiv.innerHTML = `Bienvenue ${loginId}`;
};
