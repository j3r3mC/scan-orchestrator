describe("TaskType (errors)", () => {
  it("rejette un TaskType invalide", () => {
    // @ts-expect-error – doit échouer
    const invalid: TaskType = "crawl";

    // @ts-expect-error – doit échouer
    const invalid2: TaskType = "invalid-type";

    expect(true).toBe(true);
  });
});
