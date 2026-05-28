import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateCartWorkflow } from "@medusajs/medusa/core-flows"
import { CartTypes } from "@medusajs/framework/types"
import { deriveNlProvince } from "../../../../../../lib/postcode-province"

type AddressInput = CartTypes.CreateAddressDTO

type StoreSetCartAddressBody = {
  shipping_address?: AddressInput
  billing_address?: AddressInput
  email?: string | null
}

export async function POST(
  req: MedusaRequest<StoreSetCartAddressBody>,
  res: MedusaResponse
) {
  const { cartId } = req.params
  const { shipping_address, billing_address, email } = req.body as StoreSetCartAddressBody

  const province = deriveNlProvince(shipping_address?.postal_code ?? "")

  const { result } = await updateCartWorkflow(req.scope).run({
    input: {
      id: cartId,
      shipping_address: shipping_address
        ? { ...shipping_address, province }
        : undefined,
      billing_address: billing_address ?? undefined,
      email: email ?? undefined,
    },
  })

  res.json({ cart: result })
}
