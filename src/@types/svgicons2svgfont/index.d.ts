declare module "svgicons2svgfont" {
    import { Transform } from 'stream';
    
    class SvgIcons2SvgFont extends Transform {
        constructor(options : SvgIcons2SvgFont.IOptions);
    }

    namespace SvgIcons2SvgFont {
    
        export interface IOptions {
            fontName?: string;
            fontId?: string;
            fontStyle?: string;
            fontWeight?: string;
            fixedWidth?: boolean;
            centerHorizontally?: boolean;
            normalize?: boolean;
            fontHeight?: number;
            round?: number;
            descent?: number;
            metadata?: string;
            log?: Function;
        }
    
    }
    export = SvgIcons2SvgFont;
}
