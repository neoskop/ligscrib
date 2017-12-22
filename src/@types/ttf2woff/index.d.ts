declare module "ttf2woff" {
    function ttf2woff(input : Uint8Array, options?: ttf2woff.IOptions) : ttf2woff.IWoff;
    
    namespace ttf2woff {
        interface IOptions {
            metadata?: string;
        }
        
        interface IWoff {
            buffer: Uint8Array;
        }
    }
    
    export = ttf2woff;
}
