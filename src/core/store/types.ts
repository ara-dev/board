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





