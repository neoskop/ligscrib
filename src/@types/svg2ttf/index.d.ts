declare module "svg2ttf" {
    function svg2ttf(svgFontString : string, options? : svg2ttf.IOptions) : svg2ttf.ITtf;
    
    namespace svg2ttf {
        interface IOptions {
            copyright?: string;
            ts?: number;
            version?: string;
        }
        
        interface ITtf {
            buffer: Uint8Array
        }
    }
    
    export = svg2ttf;
}
