declare module "glob-promise" {
    import * as G from 'glob';
    
    function glob(pattern : string, options? : G.IOptions) : Promise<string[]>;
    
    namespace glob {
        export const glob : typeof G;
        export const Glob : typeof G.Glob;
        export const hasMagic : typeof G.hasMagic;
        export const promise : typeof glob;
        export const sync : typeof G.sync;
    }
    
    export = glob;
}
