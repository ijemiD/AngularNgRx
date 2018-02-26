import * as RecipesAction from './../../recipes/store/recipe.actions';
import { State } from './../../shopping-list/store/shopping-list.reducers';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth-reducers';
import * as authActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
   this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new RecipesAction.StoreRecipesAction());
  }

  onFetchData() {
    this.store.dispatch(new RecipesAction.FetchRecipesAction());
  }

  onLogout() {
    this.store.dispatch(new authActions.LogOutAction());
  }
}
