import { USPS } from "@lib/constants"

const UspBar = () => {
  return (
    <div className="bg-wj-green">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-[rgba(255,255,255,0.1)]">
          {USPS.map(({ title, description }) => (
            <div
              key={title}
              className="py-5 px-5 sm:px-8 border-r border-b lg:border-b-0 border-[rgba(255,255,255,0.1)]"
            >
              <div className="font-body font-medium text-[13px] sm:text-[14px] text-wj-white">
                {title}
              </div>
              <div className="font-body text-[12px] sm:text-[13px] text-[rgba(255,255,255,0.6)] mt-0.5">
                {description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UspBar
