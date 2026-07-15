import { createElement as h, Fragment } from "react";
import home from "@/data/home.json";

export default function FlimLoader() {
  return h("div", { "id": "loader", "className": "loader" }, h("div", { "className": "loader-mask bg-pattern" }, ), h("div", { "className": "code w-embed w-script" }, ));
}
