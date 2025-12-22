// ================== Configuration ==================
// I prefer having the API configs at the top
const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2"
    : "https://newsapi.org/v2";

const NEWS_API_KEY = "3f06354d70ee4d4184163bc1cc265b12";
// TODO: Move this to env file later

// ================== Helper Functions ==================
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // Maybe add more detailed error handling here someday
  return Promise.reject(new Error(`Error: ${res.status}`));
};

// ================== Main News Search ==================
export const searchNews = async (keyword) => {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7); // Going back exactly 7 days

  // Convert dates to the format the API expects
  const toDate = today.toISOString().split("T")[0];
  const fromDate = weekAgo.toISOString().split("T")[0];

  // Building the URL manually - could use URLSearchParams
  const url = `${BASE_URL}/everything?q=${keyword}&from=${fromDate}&to=${toDate}&pageSize=100&apiKey=${NEWS_API_KEY}`;

  return fetch(url).then(checkResponse);
};

// ============ MOCK BACKEND FUNCTIONS ============
// NOTE: These are just temporary until we get the real backend working

export const signUp = (email, password, username) => {
  // If the email already exists we should reject synchronously so callers
  // don't get unhandled rejections when advancing timers in tests.
  const existing = JSON.parse(localStorage.getItem("users")) || [];
  if (existing.find((u) => u.email === email)) {
    // Reject asynchronously so tests using fake timers can observe the rejection
    return new Promise((_, reject) =>
      setTimeout(
        () => reject({ message: "User with this email already exists" }),
        0
      )
    );
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = { email, username, password }; // NOTE: plain-text for simulation only
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      const token = "fake-jwt-token-" + Date.now();
      resolve({ user: { email, username }, token });
    }, 500);
  });
};

export const signIn = (email, password) => {
  // Perform the credential check synchronously to avoid unhandled rejections
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    // Reject asynchronously so tests using fake timers can observe the rejection
    return new Promise((_, reject) =>
      setTimeout(() => reject({ message: "Incorrect email or password" }), 0)
    );
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const token = "fake-jwt-token-" + Date.now();
      resolve({ user: { email: user.email, username: user.username }, token });
    }, 500);
  });
};
// ================== Local Storage Article Functions ==================
export const getSavedArticles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let savedArticles;
      try {
        savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
      } catch (error) {
        // If localStorage is corrupted somehow
        console.warn("Error reading saved articles:", error);
        savedArticles = [];
      }
      resolve(savedArticles);
    }, 500); // Shorter delay for reading
  });
};

export const saveArticle = (article) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const existingSavedArticles =
          JSON.parse(localStorage.getItem("savedArticles")) || [];

        // Adding a unique ID - use timestamp + randomness so IDs are unique even with fake timers
        const articleWithId = {
          ...article,
          _id: `${Date.now().toString()}-${Math.random()
            .toString(36)
            .slice(2, 9)}`,
          savedAt: new Date().toISOString(), // Useful to track when saved
          keywords: article.searchKeyword
            ? [article.searchKeyword]
            : article.keywords || [],
        };

        // If this article (by URL) is already saved, merge keywords and return the existing saved entry
        const existing = existingSavedArticles.find(
          (a) => a.url === article.url
        );
        if (existing) {
          // Merge keywords if a new searchKeyword is provided
          const newKeyword = article.searchKeyword || article.keyword;
          if (newKeyword) {
            existing.keywords = existing.keywords || [];
            // add to front (recent first) if not already present
            if (!existing.keywords.includes(newKeyword)) {
              existing.keywords.unshift(newKeyword);
            }
          }

          // persist updated list
          localStorage.setItem(
            "savedArticles",
            JSON.stringify(existingSavedArticles)
          );

          // Notify listeners that a save was attempted but the article already exists (and may have been updated)
          try {
            window.dispatchEvent(
              new CustomEvent("savedArticlesChanged", {
                detail: { type: "save", article: existing },
              })
            );
          } catch {
            /* In some test environments window may be undefined */
          }

          resolve(existing);
          return;
        }

        existingSavedArticles.push(articleWithId);
        localStorage.setItem(
          "savedArticles",
          JSON.stringify(existingSavedArticles)
        );

        // Notify any listeners (UI) that saved articles changed
        try {
          window.dispatchEvent(
            new CustomEvent("savedArticlesChanged", {
              detail: { type: "save", article: articleWithId },
            })
          );
        } catch {
          /* In some test environments window may be undefined */
        }

        resolve(articleWithId);
      } catch (error) {
        console.error("Failed to save article:", error);
        reject("Failed to save article");
      }
    }, 500);
  });
};

export const deleteArticle = (articleId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const currentSavedArticles =
          JSON.parse(localStorage.getItem("savedArticles")) || [];
        const filteredArticles = currentSavedArticles.filter(
          (article) => article._id !== articleId
        );

        localStorage.setItem("savedArticles", JSON.stringify(filteredArticles));
        try {
          window.dispatchEvent(
            new CustomEvent("savedArticlesChanged", {
              detail: { type: "delete", articleId },
            })
          );
        } catch {
          /* In some test environments window may be undefined */
        }
        resolve({ message: "Article deleted successfully" });
      } catch (error) {
        console.error("Failed to delete article:", error);
        reject("Failed to delete article");
      }
    }, 500);
  });
};

// TODO: Add function to check if article is already saved
// TODO: Add better error handling throughout
// TODO: Replace localStorage with real database calls when backend is ready
