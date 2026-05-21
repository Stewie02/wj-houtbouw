import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import type { INotificationModuleService } from "@medusajs/types"

export type SendNotificationStepInput = {
  to: string
  channel: string
  template: string
  data: Record<string, unknown>
}

export const sendNotificationStep = createStep(
  "send-notification",
  async (input: SendNotificationStepInput, { container }) => {
    if (!input.to) {
      return new StepResponse(null)
    }

    const notificationService =
      container.resolve<INotificationModuleService>(Modules.NOTIFICATION)

    const notification = await notificationService.createNotifications({
      to: input.to,
      channel: input.channel,
      template: input.template,
      data: input.data,
    })

    return new StepResponse(notification)
  }
)
