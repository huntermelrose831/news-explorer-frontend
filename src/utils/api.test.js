// AI gnereated test file for src/utils/api.js
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  signUp,
  signIn,
  saveArticle,
  getSavedArticles,
  deleteArticle,
  searchNews,
} from "./api";

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("mock backend (localStorage) functions", () => {
  it("signUp: creates a user and stores it", async () => {
    vi.useFakeTimers();
    const p = signUp("test@example.com", "password", "tester");
    await vi.runAllTimersAsync();
    const res = await p;
    expect(res.user.email).toBe("test@example.com");
    const users = JSON.parse(localStorage.getItem("users"));
    expect(Array.isArray(users)).toBe(true);
    expect(users[0].email).toBe("test@example.com");
    vi.useRealTimers();
  });

  it("signUp: rejects when email already exists", async () => {
    localStorage.setItem(
      "users",
      JSON.stringify([
        { email: "dup@example.com", username: "dup", password: "pw" },
      ])
    );
    vi.useFakeTimers();
    const p = signUp("dup@example.com", "pw", "dup");
    const assertion = expect(p).rejects.toEqual({
      message: "User with this email already exists",
    });
    await vi.runAllTimersAsync();
    await assertion;
    vi.useRealTimers();
  });

  it("signIn: resolves for correct credentials and rejects otherwise", async () => {
    localStorage.setItem(
      "users",
      JSON.stringify([
        { email: "me@me.com", username: "me", password: "secr3t" },
      ])
    );
    vi.useFakeTimers();
    const success = signIn("me@me.com", "secr3t");
    const fail = signIn("me@me.com", "wrong");
    const failAssertion = expect(fail).rejects.toEqual({
      message: "Incorrect email or password",
    });
    await vi.runAllTimersAsync();
    const sres = await success;
    expect(sres.user.email).toBe("me@me.com");
    await failAssertion;
    vi.useRealTimers();
  });

  it("saveArticle / getSavedArticles / deleteArticle behave as expected", async () => {
    vi.useFakeTimers();
    const a1 = { title: "First" };
    const a2 = { title: "Second" };

    const p1 = saveArticle(a1);
    const p2 = saveArticle(a2);
    const p1Await = p1;
    const p2Await = p2;
    await vi.runAllTimersAsync();
    const s1 = await p1Await;
    const s2 = await p2Await;

    expect(s1._id).not.toBe(s2._id);

    const listP = getSavedArticles();
    await vi.runAllTimersAsync();
    const list = await listP;
    expect(list.length).toBe(2);
    expect(list.find((x) => x._id === s1._id)).toBeTruthy();

    const del = deleteArticle(s1._id);
    const delAwait = del;
    await vi.runAllTimersAsync();
    await delAwait;

    const afterP = getSavedArticles();
    await vi.runAllTimersAsync();
    const after = await afterP;
    expect(after.length).toBe(1);
    expect(after[0]._id).toBe(s2._id);
    vi.useRealTimers();
  });
});

describe("searchNews (fetch)", () => {
  it("calls fetch with the expected query and API key", async () => {
    const fakeFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ articles: [] }),
      })
    );
    globalThis.fetch = fakeFetch;

    const response = await searchNews("bitcoin");
    expect(response.articles).toHaveLength(0);
    expect(fakeFetch).toHaveBeenCalled();
    const calledWith = fakeFetch.mock.calls[0][0];
    expect(calledWith).toContain("q=bitcoin");
    expect(calledWith).toMatch(/apiKey=/);
  });
});
