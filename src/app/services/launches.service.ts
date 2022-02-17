import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Launch } from '../schemas';

export const GET_LAUNCHES = gql`
  query getLaunchesPast($limit:Int!) {
    launchesPast(limit: $limit) {
      rocket {
        rocket_name
        rocket {
          company
          engines {
            number
            type
          }
        }
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class LaunchesService {

  constructor(private apollo: Apollo) { }

  getLaunches(limit: number): Observable<Launch[]> {
    return this.apollo
      .watchQuery<{ launchesPast: Launch[] }, { limit: number }>({ query: GET_LAUNCHES, variables: { limit } })
      .valueChanges.pipe(map(res => {
        console.log('res', res);
        return res.data.launchesPast
      }))
  }
}
