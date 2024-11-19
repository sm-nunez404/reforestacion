'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'

export function Slider({
  value,
  onChange,
  min,
  max,
  step
}: {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
}) {
  return (
    <SliderPrimitive.Root
      className="relative flex items-center w-full h-5"
      value={[value]}
      onValueChange={([newValue]) => onChange(newValue)}
      max={max}
      min={min}
      step={step}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full bg-blue-500 rounded-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-blue-500 bg-white" />
    </SliderPrimitive.Root>
  )
}
