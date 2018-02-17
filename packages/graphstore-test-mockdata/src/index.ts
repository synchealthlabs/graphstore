export * from './model';
import * as fs from 'fs';
import * as path from 'path';

export function mockData(): any {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/data.json'), 'utf8'));
}
