import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { secureInnerPageGuard } from './secure-inner-page.guard';

describe('secureInnerPageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => secureInnerPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
