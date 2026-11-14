import { initBotId } from "botid/client/core";

// The contact form's Server Action POSTs to the About page.
initBotId({
  protect: [
    { path: "/about", method: "POST" },
    { path: "/about/", method: "POST" },
  ],
});
