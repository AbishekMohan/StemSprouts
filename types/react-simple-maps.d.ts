declare module "react-simple-maps" {
  import type { ComponentType, ReactNode, SVGProps } from "react"

  type Geography = { rsmKey: string; properties: { name: string; [key: string]: unknown }; [key: string]: unknown }
  type RenderProps = { geographies: Geography[] }
  type GeographyStyles = { default?: SVGProps<SVGPathElement>; hover?: SVGProps<SVGPathElement>; pressed?: SVGProps<SVGPathElement> }

  export const ComposableMap: ComponentType<SVGProps<SVGSVGElement> & { projection?: string; projectionConfig?: Record<string, number> }>
  export const Geographies: ComponentType<{ geography: string | object; children?: (props: RenderProps) => ReactNode }>
  export const Geography: ComponentType<SVGProps<SVGPathElement> & { geography: Geography; onMouseEnter?: () => void; onMouseLeave?: () => void; style?: GeographyStyles }>
  export const Marker: ComponentType<SVGProps<SVGGElement> & { coordinates: [number, number] }>
}
