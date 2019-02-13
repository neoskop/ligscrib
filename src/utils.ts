import * as glob from 'glob-promise';

export async function resolveInputGlobs(inputs : string[]) : Promise<string[]> {
    const nlist : string[][] = await Promise.all(
        inputs.map(input => {
            return glob(input);
        })
    );
    
    const list = nlist.reduce((t, c) => t.concat(c), []).filter((c, i, a) => i === a.indexOf(c));
    
    return list;
}

export function normalizeName(name : string) {
    return name.toLowerCase().replace(/-/g, '_').replace(/[^a-z0-9_]/g, '');
}
