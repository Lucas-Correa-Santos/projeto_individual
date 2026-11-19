// Script de integração da página de perfil com a API
// - Lê sessionStorage.ID_USUARIO
// - Faz fetch em /perfil?userID=...
// - Preenche o DOM

function formatarDataBR(isoString) {
    if (!isoString) return "-";
    var d = new Date(isoString);
    if (isNaN(d.getTime())) return "-";
    var dia = String(d.getDate()).padStart(2, '0');
    var mes = String(d.getMonth() + 1).padStart(2, '0');
    var ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function carregarPerfil() {
    const userId = sessionStorage.ID_USUARIO;
    const bUsuario = document.getElementById('b_usuario');

    if (!userId) {
        // não autenticado -> redirecionar para login (path relativo ao /dashboard)
        window.location = "../login.html";
        return;
    }

    // Mostrar o username no cabeçalho se disponível
    if (sessionStorage.USERNAME_USUARIO) bUsuario.innerHTML = sessionStorage.USERNAME_USUARIO;

    fetch(`/perfil?userID=${userId}`, { cache: 'no-store' })
    .then(function (response) {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.json();
    })
    .then(function (json) {
        const usuario = json.usuario || {};
        const avaliacao = json.avaliacao;

        document.getElementById('usernamePerfil').textContent = usuario.username || '-';
        document.getElementById('emailPerfil').textContent = usuario.email || '-';
        document.getElementById('tipoTitaPerfil').textContent = usuario.tipo_tita || '-';
        document.getElementById('dtCadastroPerfil').textContent = formatarDataBR(usuario.dt_cadastro);

        if (!avaliacao) {
            document.getElementById('mensagemSemAvaliacao').style.display = 'block';
            document.getElementById('aspectoAvaliacao').textContent = '-';
            document.getElementById('temaAvaliacao').textContent = '-';
            document.getElementById('notaAvaliacao').textContent = '-';
            document.getElementById('conheciaAvaliacao').textContent = '-';
        } else {
            document.getElementById('mensagemSemAvaliacao').style.display = 'none';
            document.getElementById('aspectoAvaliacao').textContent = avaliacao.aspecto || '-';
            document.getElementById('temaAvaliacao').textContent = avaliacao.tema || '-';
            document.getElementById('notaAvaliacao').textContent = avaliacao.nota ?? '-';
            document.getElementById('conheciaAvaliacao').textContent = avaliacao.conhecia || '-';
        }
    })
    .catch(function (erro) {
        console.error('Erro ao carregar perfil:', erro);
        var divErro = document.getElementById('divErro');
        divErro.style.display = 'block';
        divErro.textContent = erro.sqlMessage || erro.mensagem || 'Não foi possível carregar os dados do perfil.';
    });
}

window.addEventListener('DOMContentLoaded', carregarPerfil);
