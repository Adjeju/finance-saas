import ky from "ky";

const prefixUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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
