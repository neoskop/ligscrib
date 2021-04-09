import * as yargs from 'yargs';
import * as pkg from '../package.json';

export const ALLOWED_TYPES = new Set(['svg', 'ttf', 'woff', 'woff2']);

export function getArgs(argv = process.argv) : { inputs: string[], outDir: string, name: string, verbose: boolean, css: boolean, scss: boolean, example: boolean, types: Set<string> } {
    const args = yargs
        .version(pkg.version)
        
        .alias('o', [ 'out-dir', 'outDir' ])
        .describe('o', 'Output directory')
        .default('o', '.')
        
        .alias('n', 'name')
        .describe('n', 'Font file name (w/o file extension)')
        .default('n', 'icons')
        
        .alias('t', 'types')
        .describe('t', 'Created font file types')
        .default('t', 'svg,ttf,woff,woff2')
        
        .boolean('css')
        .describe('css', 'Create a CSS file (--no-css)')
        .default('css', true)
        
        .boolean('scss')
        .describe('scss', 'Create a SCSS file')
        .default('scss', false)
        
        .alias('e', 'example')
        .boolean('e')
        .describe('e', 'Create a HTML example file')
        
        .alias('v', 'verbose')
        .boolean('v')
        .describe('v', 'Verbose output')
        
        .usage('\n  Usage: ligscrib [options] <globs...>')
        .demandCommand(1)
        .wrap(Math.min(100, yargs.terminalWidth()))
        
        .parse(argv.slice(2));
    
    const types = new Set<string>((args.types as string).split(/,/));
    
    types.forEach(type => {
        if(!ALLOWED_TYPES.has(type)) {
            types.delete(type);
        }
    });
    
    return {
        inputs: args._.map(String),
        outDir: args.outDir as string,
        name: args.name as string,
        css: args.css as boolean,
        scss: args.scss as boolean,
        example: args.example as boolean,
        verbose: args.verbose as boolean,
        types
    };
}
