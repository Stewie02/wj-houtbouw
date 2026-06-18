import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { generateProductVariantsWorkflow } from "../../../../../../workflows/generate-product-variants"

type GenerateVariantsBody = {
  base_price: number
}

export async function POST(
  req: MedusaRequest<GenerateVariantsBody>,
  res: MedusaResponse
) {
  const { id } = req.params
  const { base_price } = req.validatedBody

  const { result } = await generateProductVariantsWorkflow(req.scope).run({
    input: { productId: id, basePrice: base_price },
  })

  res.json(result)
}
