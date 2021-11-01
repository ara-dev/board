export interface TextOption {
    fontFamily: string;
    fontSize: number;
    fontStyle: string;
    fontVariant: string;
    textDecoration: string;
    align: string;
    verticalAlign: string;
    padding: number;
    lineHeight: number;
    letterSpacing: number;
    wrap: string;
    ellipsis: boolean;
}

export interface Snapping{
     guide:number ,
   offset: number,
   snap: string,
}
export interface SnappingEdges {
    vertical : Snapping[]
    horizontal : Snapping[]
}

export interface LineGuideStops {
    vertical : number[],
    horizontal : number[]
}

export interface guide {
    lineGuide: number,
    offset: number,
    orientation:string,
    snap: string,
}

export interface HSL{
    a:number,
    h:number,
    l:number,
    s:number,
}

export interface  HSV{
    a:number,
    h:number,
    s:number,
    v:number,
}

export interface RGBA{
    a:number,
    r:number,
    g:number,
    b:number
}

export interface Color{
    a: number,
    hex:string,
    hex8:string,
    hsl : HSL,
    hsv : HSV,
    oldHue : number ,
    rgba : RGBA,
    source : string
}





