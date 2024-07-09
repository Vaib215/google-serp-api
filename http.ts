import google from "googlethis";

const options = {
  page: 0,
  safe: false, // Safe Search
  parse_ads: false, // If set to true sponsored results will be parsed
  additional_params: {
    hl: "en",
  },
};

function filterResponse(response) {
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

Bun.serve({
  port: 3000,
  async fetch(request) {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("q");
    if (!searchQuery) {
      return new Response(JSON.stringify({ error: "No query provided" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const response = await google.search(searchQuery, options);
      return new Response(JSON.stringify(filterResponse(response)), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  },
});
