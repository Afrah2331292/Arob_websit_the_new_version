export default {
    async fetch(request, env) {
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405, headers: corsHeaders });
        }

        try {
            const formData = await request.formData();
            const name = formData.get("name");
            const email = formData.get("email");
            const phone = formData.get("phone");
            const file = formData.get("file");

            const boardId = "5102656111";

            const columnValues = JSON.stringify({
                text_mm6qtb1q: email,
                text_mm6qqsq0: phone,
            });

            const createItemQuery = `
        mutation {
          create_item (
            board_id: ${boardId},
            item_name: "${name}",
            column_values: ${JSON.stringify(columnValues)}
          ) {
            id
          }
        }
      `;

            const createRes = await fetch("https://api.monday.com/v2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": env.MONDAY_API_TOKEN,
                },
                body: JSON.stringify({ query: createItemQuery }),
            });

            const createData = await createRes.json();
            const itemId = createData?.data?.create_item?.id;

            if (!itemId) {
                return new Response(JSON.stringify({ error: "Failed to create item", details: createData }), {
                    status: 500,
                    headers: corsHeaders,
                });
            }

            if (file && file.size > 0) {
                const fileMutation = `
          mutation ($file: File!) {
            add_file_to_column (item_id: ${itemId}, column_id: "file_mm6q7e9g", file: $file) {
              id
            }
          }
        `;

                const fileFormData = new FormData();
                fileFormData.append("query", fileMutation);
                fileFormData.append("variables[file]", file, file.name);

                await fetch("https://api.monday.com/v2/file", {
                    method: "POST",
                    headers: {
                        "Authorization": env.MONDAY_API_TOKEN,
                    },
                    body: fileFormData,
                });
            }

            return new Response(JSON.stringify({ success: true, itemId }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: corsHeaders,
            });
        }
    },
};