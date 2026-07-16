import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

// Look up a promotion by code so the storefront can render personal discount
// prices. Never 404s for an unknown/invalid code — returns isValid: false so
// the storefront can show a soft notice instead of erroring.
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { code } = req.params
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: promotions } = await query.graph({
    entity: "promotion",
    fields: [
      "code",
      "status",
      "application_method.type",
      "application_method.value",
    ],
    filters: { code },
  })

  const promotion = promotions[0] as
    | {
        code: string
        status: string
        application_method?: { type?: string; value?: unknown } | null
      }
    | undefined

  const method = promotion?.application_method
  // ponytail: validity = active + percentage. Campaign budget/date expiry isn't
  // checked here; add a campaign.* lookup if timed campaigns get used.
  const isValid =
    promotion?.status === "active" && method?.type === "percentage"

  res.json({
    code,
    percentage: isValid ? Number(method!.value) : 0,
    isValid,
  })
}
