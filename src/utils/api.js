// Configuration stuff - keeping the important configs up top for easy access
const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2"
    : "https://newsapi.org/v2";

const NEWS_API_KEY = "3f06354d70ee4d4184163bc1cc265b12";
// FIXME: Need to move this to .env file - it's exposed right now

// ================== Utility Functions ==================

// Basic response checker - could probably enhance this later
const validateApiResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  // TODO: Add more sophisticated error handling based on status codes
  return Promise.reject(new Error(`HTTP Error: ${response.status}`));
};

// ================== News API Functions ==================

export const searchNews = async (searchKeyword) => {
  // Calculate date range - last 7 days from today
  const currentDate = new Date();
  const oneWeekAgo = new Date(currentDate);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Format dates for API (YYYY-MM-DD format)
  const endDate = currentDate.toISOString().split("T")[0];
  const startDate = oneWeekAgo.toISOString().split("T")[0];

  // Construct the query URL - probably should use URLSearchParams but this works
  const queryUrl = `${API_BASE_URL}/everything?q=${searchKeyword}&from=${startDate}&to=${endDate}&pageSize=100&apiKey=${NEWS_API_KEY}`;

  return fetch(queryUrl).then(validateApiResponse);
};

// ============ TEMPORARY MOCK AUTH FUNCTIONS ============
// NOTE: These simulate backend calls until we have a real server

export const signUp = (userEmail, userPassword, displayName) => {
  // Check for existing users synchronously to avoid test timing issues
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  const duplicateUser = existingUsers.find((user) => user.email === userEmail);

  if (duplicateUser) {
    // Use setTimeout to make rejection async for consistent behavior
    return new Promise((_, reject) =>
      setTimeout(
        () => reject({ message: "User with this email already exists" }),
        0
      )
    );
  }

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const userList = JSON.parse(localStorage.getItem("users")) || [];
      const newUser = {
        email: userEmail,
        username: displayName,
        password: userPassword, // WARNING: storing plaintext for demo only!
      };
      userList.push(newUser);
      localStorage.setItem("users", JSON.stringify(userList));

      // Generate fake token
      const mockToken = "demo-jwt-token-" + Date.now();
      resolve({
        user: { email: userEmail, username: displayName },
        token: mockToken,
      });
    }, 500); // Simulate 500ms server response time
  });
};

export const signIn = (userEmail, userPassword) => {
  // Validate credentials synchronously first
  const userDatabase = JSON.parse(localStorage.getItem("users")) || [];
  const matchedUser = userDatabase.find(
    (user) => user.email === userEmail && user.password === userPassword
  );

  if (!matchedUser) {
    // Async rejection for consistency with real API calls
    return new Promise((_, reject) =>
      setTimeout(() => reject({ message: "Incorrect email or password" }), 0)
    );
  }

  // Simulate successful login with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const sessionToken = "demo-jwt-token-" + Date.now();
      resolve({
        user: {
          email: matchedUser.email,
          username: matchedUser.username,
        },
        token: sessionToken,
      });
    }, 500);
  });
};

// ================== Saved Articles Management ==================

let articleIdCounter = 0; // Simple counter for generating unique IDs

export const getSavedArticles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let articlesList;
      try {
        articlesList = JSON.parse(localStorage.getItem("savedArticles")) || [];
      } catch (parseError) {
        // Handle corrupted localStorage data gracefully
        console.warn(
          "Could not parse saved articles from storage:",
          parseError
        );
        articlesList = [];
      }
      resolve(articlesList);
    }, 300); // Slightly faster for read operations
  });
};

export const saveArticle = (articleData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const currentSavedArticles =
          JSON.parse(localStorage.getItem("savedArticles")) || [];

        // Create article with unique ID and metadata
        const articleToSave = {
          ...articleData,
          _id: `article-${Date.now()}-${++articleIdCounter}-${Math.random()
            .toString(36)
            .substring(2, 10)}`, // More readable ID format
          savedAt: new Date().toISOString(),
          keywords: articleData.searchKeyword
            ? [articleData.searchKeyword]
            : articleData.keywords || [],
        };

        // Check for duplicates by URL (if URL exists)
        const existingArticle = articleData?.url
          ? currentSavedArticles.find((saved) => saved.url === articleData.url)
          : undefined;

        if (existingArticle) {
          // Update existing article with new keyword if provided
          const newSearchKeyword =
            articleData.searchKeyword || articleData.keyword;
          if (newSearchKeyword) {
            existingArticle.keywords = existingArticle.keywords || [];
            // Add to beginning of list if not already present
            if (!existingArticle.keywords.includes(newSearchKeyword)) {
              existingArticle.keywords.unshift(newSearchKeyword);
            }
          }

          // Save updated list
          localStorage.setItem(
            "savedArticles",
            JSON.stringify(currentSavedArticles)
          );

          // Notify UI components about the update
          try {
            window.dispatchEvent(
              new CustomEvent("savedArticlesChanged", {
                detail: { type: "update", article: existingArticle },
              })
            );
          } catch {
            // Fail silently in test environments where window might not exist
          }

          resolve(existingArticle);
          return;
        }

        // Add new article to the list
        currentSavedArticles.push(articleToSave);
        localStorage.setItem(
          "savedArticles",
          JSON.stringify(currentSavedArticles)
        );

        // Broadcast change event for reactive UI updates
        try {
          window.dispatchEvent(
            new CustomEvent("savedArticlesChanged", {
              detail: { type: "save", article: articleToSave },
            })
          );
        } catch {
          // Silent fail for test environments
        }

        resolve(articleToSave);
      } catch (storageError) {
        console.error("Article save operation failed:", storageError);
        reject("Unable to save article to storage");
      }
    }, 600); // Slightly longer delay to simulate server processing
  });
};

export const deleteArticle = (targetArticleId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const savedArticlesList =
          JSON.parse(localStorage.getItem("savedArticles")) || [];

        // Remove the article with matching ID
        const updatedArticlesList = savedArticlesList.filter(
          (article) => article._id !== targetArticleId
        );

        // Check if anything was actually deleted
        const wasDeleted =
          updatedArticlesList.length < savedArticlesList.length;

        if (!wasDeleted) {
          reject("Article not found in saved list");
          return;
        }

        localStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedArticlesList)
        );

        // Notify components about the deletion
        try {
          window.dispatchEvent(
            new CustomEvent("savedArticlesChanged", {
              detail: { type: "delete", articleId: targetArticleId },
            })
          );
        } catch {
          // Test environment compatibility
        }

        resolve({ message: "Article removed successfully" });
      } catch (deleteError) {
        console.error("Article deletion failed:", deleteError);
        reject("Failed to remove article from storage");
      }
    }, 400); // Medium delay for delete operations
  });
};

// Helper function to check if an article is already saved (might need this later)
export const isArticleSaved = async (articleUrl) => {
  try {
    const savedArticles = await getSavedArticles();
    return savedArticles.some((article) => article.url === articleUrl);
  } catch (error) {
    console.warn("Could not check if article is saved:", error);
    return false;
  }
};

// TODO: Implement article search/filtering within saved articles
// TODO: Add batch operations for multiple articles
// TODO: Replace all localStorage calls with real API endpoints when backend is ready
// TODO: Add proper authentication headers to API calls
