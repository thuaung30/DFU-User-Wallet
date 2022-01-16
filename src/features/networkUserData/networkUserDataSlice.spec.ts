import networkUserDataReducer from "./networkUserDataSlice";

describe("networkUserData reducer", () => {
  it("should handle initial state", () => {
    expect(networkUserDataReducer(undefined, { type: "unknown" })).toEqual({
      data: {},
      fetching: false,
      error: false,
    });
  });
});
