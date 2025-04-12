// export const useToken = () => {
//   const token = useCookie<string | null>("ad-auth", {
//     maxAge: 60 * 60 * 24 * 7,
//     sameSite: "strict",
//     httpOnly: true,
//   });

//   return {
//     token,
//     setToken: (val: string) => (token.value = val),
//     getToken: () => useCookie("ad-auth"),
//     clearToken: () => (token.value = null),
//   };
// };
