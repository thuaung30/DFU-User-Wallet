import accountReducer, { AccountState, logOut } from "./accountSlice";

describe("account reducer", () => {
  it("should handle initial state", () => {
    expect(accountReducer(undefined, { type: "unknown" })).toEqual({
      data: {},
      selectedAccountAddress: null,
      fetching: false,
      error: false,
    });
  });

  it("should handle initial state", () => {
    const dummyState: AccountState = {
      data: {
        vuildmflkaflffjasdkfj: {
          address: "vuildmflkaflffjasdkfj",
          walletCredentials: {
            address: "vuildmflkaflffjasdkfj",
            version: 1,
            type: "identity",
            meta: {
              signingKey: {
                privateKey: "ldfjsaflkdajsfkjd",
                mnemonic: "dlajsfl;ajfl;kajfl",
              },
            },
          },
        },
      },
      selectedAccountAddress: "vuildmflkaflffjasdkfj",
      fetching: false,
      error: false,
    };

    expect(accountReducer(dummyState, logOut())).toEqual({
      data: {
        vuildmflkaflffjasdkfj: {
          address: "vuildmflkaflffjasdkfj",
          walletCredentials: {
            address: "vuildmflkaflffjasdkfj",
            version: 1,
            type: "identity",
            meta: {
              signingKey: {
                privateKey: "ldfjsaflkdajsfkjd",
                mnemonic: "dlajsfl;ajfl;kajfl",
              },
            },
          },
        },
      },
      selectedAccountAddress: null,
      fetching: false,
      error: false,
    });
  });
});
