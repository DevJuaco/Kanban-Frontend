import { TestBed } from '@angular/core/testing';

import { TasksDropService } from './tasks-drop.service';

describe('TasksDropService', () => {
  let service: TasksDropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
