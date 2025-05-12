document.addEventListener("DOMContentLoaded", function () {
    const fraudList = document.getElementById("fraud-list");

    fetch("fraud-posts.json")
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                fraudList.innerHTML = "<p>暂无防骗文章</p>";
                return;
            }

            data.forEach(article => {
                const item = document.createElement("div");
                item.className = "article-card";

                // **确保 article.title 正确赋值**
                item.innerHTML = `
                    <h3>${article.title ? article.title : "未命名文章"}</h3>
                    <p>${article.time ? article.time : "未知时间"}</p>
                `;

                item.addEventListener("click", () => {
                    window.location.href = `fraud-article.html?id=${article.id}`;
                });

                fraudList.appendChild(item);
            });
        })
        .catch(error => console.error("加载防骗文章失败:", error));
});
