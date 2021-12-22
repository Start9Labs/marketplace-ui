import { Pipe, PipeTransform } from '@angular/core'
import { Emver } from '../services/emver.service'

@Pipe({
    name: 'compareEmver',
})
export class EmverComparesPipe implements PipeTransform {
  constructor (private readonly emverService: Emver) {  }

  transform (first: string, second: string): SemverResult {
    try {
      return this.emverService.compare(first, second) as SemverResult
    } catch (e) {
      console.warn(`emver comparison failed`, e, first, second)
      return 'comparison-impossible'
    }
  }
}
type SemverResult = 0 | 1 | -1 | 'comparison-impossible'

@Pipe({
    name: 'displayEmver',
})
export class EmverDisplayPipe implements PipeTransform {
  constructor () { }

  transform (version: string): string {
    return displayEmver(version)
  }
}

export function displayEmver (version: string): string {
  const vs = version.split('.')
  if (vs.length === 4) return `${vs[0]}.${vs[1]}.${vs[2]}~${vs[3]}`
  return version
}