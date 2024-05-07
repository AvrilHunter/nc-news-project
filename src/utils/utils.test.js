const { formatDate } = require("./utils")

describe("formatDate", () => {
  it("should return date in readable format", () => {
    expect(formatDate("2020-09-16T17:26:00.000Z")).toBe("16-09-2020")
    expect(formatDate("2020-09-11T21:12:00.000Z")).toBe("11-09-2020");
    expect(formatDate("2020-11-15T13:25:00.000Z")).toBe("15-11-2020");
  })
})