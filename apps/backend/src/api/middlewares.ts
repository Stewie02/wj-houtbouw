import { defineMiddlewares, validateAndTransformBody } from "@medusajs/framework/http"
import { z } from "zod"

export default defineMiddlewares([
  {
    matcher: "/admin/custom/products/:id/generate-variants",
    method: "POST",
    middlewares: [
      validateAndTransformBody(
        z.object({
          base_price: z.number().positive(),
        })
      ),
    ],
  },
])
