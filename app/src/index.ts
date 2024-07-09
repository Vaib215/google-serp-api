import { Hono } from "hono";
import { search } from "googlethis";

const options = {
  page: 0,
  safe: false, // Safe Search
  parse_ads: false, // If set to true sponsored results will be parsed
  additional_params: {
    hl: "en",
  },
};

const app = new Hono();

function filterResponse(response: any) {
  const filteredResponse = {};
  for (const key in response) {
    if (Array.isArray(response[key]) && response[key].length > 0) {
      filteredResponse[key] = response[key];
    } else if (response[key] && typeof response[key] === "object") {
      const nestedFiltered = filterResponse(response[key]);
      if (Object.keys(nestedFiltered).length > 0) {
        filteredResponse[key] = nestedFiltered;
      }
    } else if (response[key] !== null && response[key] !== undefined) {
      filteredResponse[key] = response[key];
    }
  }
  return filteredResponse;
}

app.get("/", async (c) => {
  const searchQuery = c.req.query("q");
  if (!searchQuery) {
    return c.json({ error: "No query provided" }, 400);
  }

  try {
    const response = await search(searchQuery, options);
    const filteredResponse = filterResponse(response);
    return c.json({ response: filteredResponse });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

app.get("/health", (c) => {
  c.text("OK");
});

export default app;
