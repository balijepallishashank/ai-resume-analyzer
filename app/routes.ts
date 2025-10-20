import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "routes/home.tsx"),
  route("auth", "routes/auth.tsx"),
  route("upload", "routes/upload.tsx"),
  route("resume/:id", "routes/resume.tsx"),
  route("wipe", "routes/wipe.tsx"),
] satisfies RouteConfig;
