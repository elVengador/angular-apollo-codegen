import { Component } from '@angular/core';
import { Launch } from './schemas';
import { LaunchesService } from './services/launches.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  launches: Launch[] = []
  limitLaunches = 3

  constructor(private launchesService: LaunchesService) {
    this.getLaunchesPast(this.limitLaunches)
  }

  getLaunchesPast(limit: number) {
    this.launchesService
      .getLaunches(limit)
      .subscribe(res => this.launches = res)
  }
}
