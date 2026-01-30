const postsContainer = document.getElementById("posts");
const paginationEl = document.getElementById("pagination");

function getPage() {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page"), 10);
    return Number.isNaN(page) || page < 1 ? 1 : page;
}

function mostrarErro(mensagem) {
    postsContainer.innerText = mensagem;
    paginationEl.innerHTML = "";
}

function mostrarLoading() {
    postsContainer.innerText = "Carregando posts...";
    paginationEl.innerHTML = "";
}

function renderizarPaginacao(page, hasNext) {
    let html = "";

    if (page > 1) {
        html += `<a href="?page=${page - 1}">← Anterior</a>`;
    } else {
        html += `<span></span>`;
    }

    if (hasNext) {
        html += `<a href="?page=${page + 1}">Próxima →</a>`;
    }

    paginationEl.innerHTML = html;
}

async function carregarPosts() {
    const page = getPage();
    mostrarLoading();

    try {
        const response = await fetch(`http://localhost:8000/posts?page=${page}`, {
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            mostrarErro(`Erro ao carregar posts (HTTP ${response.status}).`);
            return;
        }

        const result = await response.json();

        if (!Array.isArray(result.data)) {
            mostrarErro("Formato de resposta inválido.");
            return;
        }

        postsContainer.innerHTML = result.data.map(post => `
            <article>
                <h2>
                    <a href="post.html?id=${post.id}">
                        ${post.title}
                    </a>
                </h2>
                ${post.summary ? `<p>${post.summary}</p>` : ""}
            </article>
        `).join("");

        renderizarPaginacao(page, result.hasNext === true);

    } catch (error) {
        console.error(error);
        mostrarErro("Falha de conexão com o servidor.");
    }
}

carregarPosts();
