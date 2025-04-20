"use client"

import { Check } from "lucide-react"

export default function TimelineProgress() {
  const steps = [
    "Thinking",
    "Identifying MCU movies",
    "Listing future releases",
    "Evaluating movie inclusion",
    "Searching for missing synopses",
    "Compiling movie",
  ]

  return (
    <div className="bg-[#121212] text-gray-300 p-6 min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="relative">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start mb-8 relative">
              {/* Vertical line */}
              {index < steps.length - 1 && (
                <div
                  className="absolute left-[18px] top-[28px] w-[2px] bg-gray-600"
                  style={{ height: "calc(100% - 8px)" }}
                />
              )}

              {/* Checkmark circle */}
              <div className="rounded-full bg-gray-600 p-1 mr-4 z-10">
                <Check className="h-5 w-5 text-gray-300" />
              </div>

              {/* Step text */}
              <div className="pt-0.5 text-gray-300 text-lg font-medium">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
/* and then, in page.tsx, we can import this component in a rfce and use it as <TimelineProgress /> */