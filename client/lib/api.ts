import ky from "ky";

const prefixUrl = "http://127.0.0.1:3000";

export const api = ky.create({
  prefixUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        token && request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
  },
});
