import * as yargs from 'yargs';
import * as pkg from '../package.json';

export function getArgs(argv = process.argv) : { inputs: string[], outDir: string, name: string, verbose: boolean, example: boolean } {
    const args = yargs
        .version(pkg.version)
        
        .alias('o', [ 'out-dir', 'outDir' ])
        .describe('o', 'Output directory')
        .default('o', '.')
        
        .alias('n', 'name')
        .describe('n', 'Font file name (w/o file extension)')
        .default('n', 'icons')
        
        .alias('e', 'example')
        .boolean('e')
        .describe('e', 'Create a HTML example file')
        
        .alias('v', 'verbose')
        .boolean('v')
        .describe('v', 'Verbose output')
        
        .usage('\n  Usage: ligscrib [options] <globs...>')
        .demandCommand(1)
        
        .parse(argv.slice(2));
    
    return {
        inputs: args._,
        outDir: args.outDir,
        name: args.name,
        example: args.example,
        verbose: args.verbose
    };
}
