import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameComponent} from './game.component';
import {Component} from '@angular/core';
import {GameStateService} from "../../core/services/game-state.service";
import {PlayerService} from "../../core/services/player.service";

@Component({
  selector: 'app-logo',
  template: '<p>mock</p>'
})
class MockComponent {
}


describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent,
        GameComponent],
      providers: [
        {provide: GameStateService, useValue: {}},
        {provide: PlayerService, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeFalsy();
  });
});
