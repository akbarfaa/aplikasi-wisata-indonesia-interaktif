import { createFileRoute } from "@tanstack/react-router";
import { villages } from "../../lib/data";

export const Route = createFileRoute("/api/villages")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        const region = url.searchParams.get("region");

        let data = villages;

        if (id) {
          data = data.filter((v) => v.id === id);
        }

        if (region) {
          data = data.filter((v) => v.region.toLowerCase() === region.toLowerCase());
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
