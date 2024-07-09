# Google Serp API (unofficial)

This project provides a simple API for querying Google Search results. The API is built using [Bun](https://bun.sh/) and the [googlethis](https://www.npmjs.com/package/googlethis) library. This is an unofficial API and is not related to Google anyway. If you find anything wrong, feel free to create an issue and I will work upon it.

## Features

- Perform Google searches via API requests.
- Filters out empty or null fields from the results.
- Supports customization of search parameters.

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Vaib215/google-serp-api.git
   cd google-serp-api
   ```
2. Install dependencies:

    ```sh
    bun install
    ```
3. Running the Server

    ```sh
    bun run index.js
    ```
    The server will start on port 3000 by default.

## Usage
### Making a Search Request

To make a search request, send a GET request to the server with the query parameter q:

```sh
curl http://localhost:3000?q=your+search+query
```

### Example Response
The response will be a JSON object containing the search results with empty or null fields filtered out:

```json
{
  "results": [
    {
      "title": "OpenAI",
      "description": "OpenAI is an AI research and deployment company.",
      "url": "https://www.openai.com/"
    }
  ],
  "knowledge_panel": {
    "type": "Organization",
    "title": "OpenAI",
    "description": "OpenAI is an AI research and deployment company.",
    "url": "https://www.openai.com/"
  }
}
```


## Customization

The search parameters can be customized by modifying the options object in index.js:

```js
const options = {
  page: 0,
  safe: false, // Safe Search
  parse_ads: false, // If set to true sponsored results will be parsed
  additional_params: {
    hl: "en", // Language parameter
  },
};
```

# Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

