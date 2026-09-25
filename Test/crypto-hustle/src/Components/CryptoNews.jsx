import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY1;

function CryptoNews() {
  const [newsList, setNewsList] = useState(null);

  useEffect(() => {
    const getNewsArticles = async () => {
      const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + API_KEY);
      const json = await response.json();
      setNewsList(json.articles); // field name will vary by API — check the docs
    };
    getNewsArticles().catch(console.error);
  }, []);

  console.log(API_KEY);
  

  return (
    <div>
      <h3>Crypto News</h3>
      <ul className="side-list">
        {newsList &&
          newsList.map((article) => (
            <li className="news-article" key={article.title}>
              <a href={article.url}>{article.title}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CryptoNews;
