import env from "@/env";
import ky from "ky";

const prefixUrl = env.BACKEND_URL;

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
