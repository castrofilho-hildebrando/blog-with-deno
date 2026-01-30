const titleEl = document.getElementById("post-title");
const contentEl = document.getElementById("post-content");

function getPostId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function mostrarErro(mensagem) {
    titleEl.innerText = "Erro";
    contentEl.innerText = mensagem;
}

async function carregarPost() {
    const postId = getPostId();

    if (!postId) {
        mostrarErro("ID do post não informado.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/posts/${postId}`, {
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                mostrarErro("Post não encontrado.");
            } else {
                mostrarErro(`Erro ao carregar post (HTTP ${response.status}).`);
            }
            return;
        }

        const post = await response.json();

        if (!post.title || !post.content) {
            mostrarErro("Formato de resposta inválido.");
            return;
        }

        titleEl.innerText = post.title;
        contentEl.innerHTML = sanitizarHTML(post.content);

    } catch (error) {
        console.error(error);
        mostrarErro("Falha de conexão com o servidor.");
    }
}

function sanitizarHTML(html) {
    const template = document.createElement("template");
    template.innerHTML = html;

    const allowedTags = [
        "P", "A", "STRONG", "EM", "UL", "OL", "LI",
        "H1", "H2", "H3", "BLOCKQUOTE", "CODE", "PRE"
    ];

    const allowedAttributes = {
        "A": ["href", "title", "target", "rel"]
    };

    const nodes = template.content.querySelectorAll("*");

    nodes.forEach(node => {
        if (!allowedTags.includes(node.tagName)) {
            node.replaceWith(...node.childNodes);
            return;
        }

        [...node.attributes].forEach(attr => {
            const allowedForTag = allowedAttributes[node.tagName] || [];
            if (!allowedForTag.includes(attr.name)) {
                node.removeAttribute(attr.name);
            }
        });

        if (node.tagName === "A") {
            node.setAttribute("rel", "noopener noreferrer");
            node.setAttribute("target", "_blank");
        }
    });

    return template.innerHTML;
}

carregarPost();
