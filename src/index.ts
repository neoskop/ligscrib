// import globals
import 'source-map-support/register';
import 'colors';

// import platform
import * as path from 'path';

// import packages
import * as SvgIcons2SvgFont from 'svgicons2svgfont';
import { WritableStreamBuffer } from 'stream-buffers';
import * as fs from 'fs-extra';

// import sources
import { getArgs } from './args';
import { css } from './templates/css';
import { scss } from './templates/scss';
import { html } from './templates/html';
import { convertSvgToTtf, convertTtf2Woff, convertTtf2Woff2 } from './converter';
import { normalizeName, resolveInputGlobs } from './utils';

// re-export
export * from './args';
export * from './templates/css';
export * from './templates/html';
export * from './converter';
export * from './utils';

export async function main(argv = process.argv) {
    try {
        const args = getArgs(argv);
        const log = args.verbose ? (...logs : any[]) => console.log(...logs) : () => {};
        const rlog = args.verbose ? (str : string) => process.stdout.write(str) : (_s : string) => {};
        
        if(0 === args.types.size) {
            throw new Error('No valid types provided'.red);
        }
        
        const files = await resolveInputGlobs(args.inputs);
        
        log('input files', files);
        
        const fontStream = new SvgIcons2SvgFont({
            fontName: args.name,
            normalize: true,
            fontHeight: 1000,
            log
        });
        
        const svgStream = new WritableStreamBuffer();
        
        fontStream.pipe(svgStream);
        
        const done = new Promise((resolve, reject) => {
            svgStream.on('finish', resolve).on('error', reject);
        });
        
        const icons = new Set<string>();
        
        for(const file of files) {
            const ext = path.extname(file);
            const filename = path.basename(file, ext);
            const name = normalizeName(filename);
            if(!/^\.svg$/i.test(ext)) {
                throw new Error(`Only SVG allowed, "${file}" given`.red);
            }
            
            if(name === filename) {
                console.log('\u2714'.green, ` added ${name.cyan}`)
            } else {
                console.log('\u2714'.yellow, ` added ${filename.yellow} as ${name.cyan}`)
            }
    
            const stream = fs.createReadStream(file);
            (stream as any).metadata = {
                unicode: [ name ],
                name
            };
    
            icons.add(name);
            fontStream.write(stream);
        }
    
        if(0 === icons.size) {
            throw new Error('No valid files provided'.red);
        }
        
        fontStream.end();
        
        await done;
        log('SVG Font created');
        
        await fs.mkdirp(args.outDir);
        const svg = svgStream.getContents();

        if(!svg) {
            throw new Error('Could not generate SVG'.red);
        }

        const ttf = convertSvgToTtf(svg);
        
        if(args.types.has('svg')) {
            rlog('Write svg... ');
            await fs.writeFile(path.join(args.outDir, `${args.name}.svg`), svg);
            rlog('\u2714\n'.green);
        }
        
        if(args.types.has('ttf')) {
            rlog('Write ttf... ');
            await fs.writeFile(path.join(args.outDir, `${args.name}.ttf`), ttf);
            rlog('\u2714\n'.green);
        }
        if(args.types.has('woff')) {
            rlog('Write woff... ');
            await fs.writeFile(path.join(args.outDir, `${args.name}.woff`), convertTtf2Woff(ttf));
            rlog('\u2714\n'.green);
        }
    
        if(args.types.has('woff2')) {
            rlog('Write woff2... ');
            await fs.writeFile(path.join(args.outDir, `${args.name}.woff2`), convertTtf2Woff2(ttf));
            rlog('\u2714\n'.green);
        }
        
        if(args.css || args.example) {
            rlog('Write css... ');
            await fs.writeFile(path.join(args.outDir, `${args.name}.css`), css(args.name, args.types));
            rlog('\u2714\n'.green);
        }
        
        if(args.scss) {
            rlog('Write scss... ');
            await fs.writeFile(path.join(args.outDir, `${args.name}.scss`), scss(args.name));
            rlog('\u2714\n'.green);
        }
    
        if(args.example) {
            rlog('Write html... ');
            await fs.writeFile(path.join(args.outDir, `example.html`), html(args.name, icons));
            rlog('\u2714\n'.green);
        }
        
        console.log();
        console.log('\u2714  Done'.green);
        
    } catch(e) {
        console.error(e.message || e);
        process.exit(1);
    }
}
