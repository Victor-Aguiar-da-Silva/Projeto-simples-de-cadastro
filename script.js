const form = document.getElementById("form");
const lista = document.getElementById("lista");
const mensagemErro = document.getElementById("mensagemErro");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function salvar() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function renderizar() {
  lista.innerHTML = "";

  usuarios.forEach((user, index) => {
    const li = document.createElement("li");
    li.textContent = `${user.nome} - ${user.email} - ${user.idade} anos`;

    const btn = document.createElement("button");
    btn.textContent = "Excluir";
    btn.addEventListener("click", () => {
      usuarios.splice(index, 1);
      salvar();
      renderizar();
    });

    li.appendChild(btn);
    lista.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const idade = document.getElementById("idade").value;
  const senha = document.getElementById("senha").value;

  const emailNormalizado = email.toLowerCase();

  const emailExiste = usuarios.some(
    user => user.email.toLowerCase() === emailNormalizado
  );


  if (emailExiste) {
    mensagemErro.textContent = "Este email já foi utilizado!";
    mensagemErro.style.display = "block";
    return;
  }

 
  mensagemErro.style.display = "none";

  usuarios.push({
    nome,
    email: emailNormalizado,
    idade,
    senha
  });

  salvar();
  renderizar();
  form.reset();
});

renderizar();
