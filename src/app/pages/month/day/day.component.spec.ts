import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { DayComponent } from './day.component';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;
  let store: MockStore;
  const initialState = {
    months: {
      days: [
        {
          id: 'Sun Feb 28 2021',
          day: 28,
          isDisabled: false,
          color: 'red'
        },
        {
          id: 'Mon Mar 01 2021',
          day: 1,
          isDisabled: true,
          color: 'blue'
        }
      ]
    },
    reminder: {
      reminder: [
        {
          remind: 'remind test',
          datetime: new Date(),
          dateId: 'Sun Feb 28 2021',
          color: 'red'
        }
      ]
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    component.id = 'Sun Feb 28 2021';
    component.day = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display reminder', () => {
    expect(fixture.debugElement.queryAll(By.css('.relative')).length).toBe(1);
  })

  it('should display hint number to multiple reminder on same date', () => {
    store.setState({
      months: {
        days: [
          {
            id: 'Sun Feb 28 2021',
            day: 28,
            isDisabled: false,
            color: 'red'
          }
        ]
      },
      reminder: {
        reminder: [
          {
            remind: 'remind test',
            datetime: new Date(),
            dateId: 'Sun Feb 28 2021',
            color: 'red'
          },
          {
            remind: 'remind test2',
            datetime: new Date(),
            dateId: 'Sun Feb 28 2021',
            color: 'blue'
          }
        ]
      }
    });
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.absolute')).length).toBe(1);
    expect(component.reminders.filter(remind => remind.dateId == 'Sun Feb 28 2021').length).toBe(2);
  })
});
