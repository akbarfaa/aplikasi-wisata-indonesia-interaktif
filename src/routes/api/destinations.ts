import { createFileRoute } from "@tanstack/react-router";
import { destinations } from "../../lib/data";

export const Route = createFileRoute("/api/destinations")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        const category = url.searchParams.get("category");
        const island = url.searchParams.get("island");

        let data = destinations;

        if (id) {
          data = data.filter((d) => d.id === id);
        }

        if (category) {
          data = data.filter((d) => d.category.toLowerCase() === category.toLowerCase());
        }

        if (island) {
          data = data.filter((d) => d.island.toLowerCase() === island.toLowerCase());
        }

        return new Response(JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
    },
  },
});
