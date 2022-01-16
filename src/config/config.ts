export const __DEV__ = process.env.NODE_ENV !== "production";

export const baseApiUrl =
  process.env.REACT_APP_BASE_API_URL ||
  "https://tl-clientlib-wrapper-api.herokuapp.com";

// export const baseApiUrl =
//   process.env.REACT_APP_BASE_API_URL || "http://localhost:3002";

// MMK address
export const networkAddress =
  process.env.REACT_APP_NETWORK_ADDRESS ||
  "0x61963C98ee147c65BA4E630E09730bf90DBbB003";

// Trade manager address
export const contactAddress =
  process.env.REACT_APP_CONTACT_ADDRESS ||
  "0x5e6551E88Bf805FbD2328cfba86e9A02BFdC70F1";

// Credit line given
export const clGiven = process.env.REACT_APP_CONTACT_ADDRESS || "10000000";

// Credit line received
export const clReceived = process.env.REACT_APP_CONTACT_ADDRESS || "0";
