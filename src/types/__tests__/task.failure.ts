describe("Task (errors)", () => {
  it("rejette un Task avec un type invalide", () => {
    // @ts-expect-error – type invalide
    const badTask1: Task = {
      id: "123",
      type: "crawl", // ❌ n'existe plus
      payload: { url: "https://example.com" },
      createdAt: Date.now(),
    };

    // @ts-expect-error – payload ne correspond pas au type
    const badTask2: Task = {
      id: "123",
      type: "crawl:page",
      payload: { method: "POST" }, // ❌ pas dans CrawlPagePayload
      createdAt: Date.now(),
    };

    expect(true).toBe(true);
  });
});
