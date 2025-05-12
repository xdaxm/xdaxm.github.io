document.addEventListener("DOMContentLoaded", function () {
    const articleList = document.getElementById("article-list");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // 1️⃣ 加载 `market-posts.json` 文章数据
    fetch("market-posts.json")
        .then(response => response.json())
        .then(data => {
            renderArticles(data); // 初始渲染所有文章

            // 2️⃣ 监听筛选按钮，筛选文章
            filterButtons.forEach(button => {
                button.addEventListener("click", function () {
                    document.querySelector(".active").classList.remove("active");
                    this.classList.add("active");

                    const category = this.dataset.category;
                    const filteredArticles = category === "all"
                        ? data
                        : data.filter(article => article.category === category);
                    
                    renderArticles(filteredArticles);
                });
            });
        })
        .catch(error => console.error("加载文章失败:", error));

    // 3️⃣ 渲染文章列表
    function renderArticles(articles) {
        articleList.innerHTML = ""; // 清空旧内容

        if (articles.length === 0) {
            articleList.innerHTML = "<p>暂无文章</p>";
            return;
        }

        articles.forEach(article => {
            const card = document.createElement("div");
            card.className = `article-card ${article.category === "供" ? "red" : "blue"}`;
            card.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.time}</p>
            `;
            card.addEventListener("click", () => {
                window.location.href = `market-article.html?id=${article.id}`;
            });
            articleList.appendChild(card);
        });
    }
});
