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
  {
    matcher: "/store/custom/orders/:id/withdrawal",
    method: "POST",
    middlewares: [
      validateAndTransformBody(
        z.object({
          reason: z.string().max(500).optional(),
        })
      ),
    ],
  },
  {
    matcher: "/store/custom/orders/:id/withdrawal/confirm",
    method: "POST",
    middlewares: [
      validateAndTransformBody(
        z.object({
          token: z.string().min(1),
        })
      ),
    ],
  },
])
