import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Project } from '../models/project-model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { WidgetService } from '../services/widget.service';
@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  @ViewChild('testwidgetbtn') private elementRef: ElementRef;

  project: Project;

  projectId: string;
  preChatForm = false;
  projectName: string;
  calloutTimer: string;
  hasSelectedCalloutTimer = false;
  preChatFormValue = 'false';
  http: Http;
  calloutTimerSecondSelected = -1;
  alignmentSelected = 'right'
  // preChatForm = 'preChatForm'
  calloutTimerOptions = [
    { seconds: 'disabled', value: -1 },
    { seconds: 'immediately', value: 0 },
    { seconds: '5', value: 5 },
    { seconds: '10', value: 10 },
    { seconds: '15', value: 15 },
    { seconds: '20', value: 20 },
    { seconds: '25', value: 25 },
    { seconds: '30', value: 30 }
  ]

  calloutTitle: string;
  _calloutTitle: string;
  calloutMsg: string;
  _calloutMsg: string;

  primaryColor: string;
  secondaryColor: string;

  themeColor: string;
  // primaryColor = 'rgb(159, 70, 183)';
  // secondaryColor = 'rgb(38, 171, 221)';


  alignmentOptions = [
    { alignTo: 'bottom right', value: 'right' },
    { alignTo: 'bottom left', value: 'left' }
  ]
  constructor(
    http: Http,
    private auth: AuthService,
    private router: Router,
    private widgetService: WidgetService
  ) { this.http = http }

  ngOnInit() {
    this.auth.checkRoleForCurrentProject();

    this.getCurrentProject();

    this.subscribeToWidgetDesignPrimaryColor();
    this.subscribeToWidgetDesignSecondaryColor();
  }

  getCurrentProject() {
    this.auth.project_bs.subscribe((project) => {
      this.project = project
      console.log('00 -> WIDGET COMP project from AUTH service subscription  ', project)

      if (project) {
        this.projectId = project._id;
        this.projectName = project.name;
      }
    });
  }

  subscribeToWidgetDesignPrimaryColor() {
    this.widgetService.primaryColorBs.subscribe((primary_color: string) => {
      console.log('WIDGET COMP - PRIMARY COLOR ', primary_color);
      if (primary_color) {
        this.primaryColor = primary_color

        this.themeColor = 'themeColor: {{ primaryColor }}'
      }
    });
  }

  subscribeToWidgetDesignSecondaryColor() {
    this.widgetService.secondaryColorBs.subscribe((secondary_color: string) => {
      console.log('WIDGET COMP - SECONDARY COLOR ', secondary_color);
      if (secondary_color) {
        this.secondaryColor = secondary_color
      }
    });
  }

  // addslashes(calloutTitle) {
  //   console.log(' +++ +++ CALL OUT TITLE ADD SLASHES ', calloutTitle);
  //   return (calloutTitle + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
  // }

  //   addslashes(s) {
  //     return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  // }

  onKeyCalloutTitle() {
    if (this.calloutTitle) {
      this._calloutTitle = this.calloutTitle.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
      console.log('+++ +++ ON KEY-UP CALLOUT TITLE ', this._calloutTitle);
    }
  }

  onKeyCalloutMsg() {
    if (this.calloutMsg) {
      this._calloutMsg = this.calloutMsg.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
      console.log('+++ +++ ON KEY-UP CALLOUT MSG ', this._calloutMsg);
    }
  }

  setSelectedCalloutTimer() {
    console.log('»»» SET SELECTED CALLOUT TIMER - TIMER SELECTED', this.calloutTimerSecondSelected)
    // if (timer === 'immediately') {
    //   this.calloutTimerSecondSelected = 0;
    //   console.log('»»» CALLOUT TIMER', this.calloutTimerSecondSelected)

    // } else if (timer === 'disabled') {
    //   this.calloutTimerSecondSelected = -1
    //   console.log('»»» CALLOUT TIMER', this.calloutTimerSecondSelected)

    // } else {
    //   this.calloutTimerSecondSelected = timer
    //   console.log('»»» CALLOUT TIMER', this.calloutTimerSecondSelected)

    // }

    if (this.calloutTimerSecondSelected === -1) {

      this._calloutTitle = ''; // callout title escaped
      this.calloutTitle = '';
      console.log('»»» SET SELECTED CALLOUT TIMER - CALLOUT TITLE ESCAPED', this._calloutTitle)
      this._calloutMsg = ''; // callout msg escaped
      this.calloutMsg = '';
      console.log('»»» SET SELECTED CALLOUT TIMER - CALLOUT MSG ESCAPED ', this._calloutMsg)
    }
  }

  setSelectedAlignment() {
    console.log('»»» ALIGNMENT SELECTED ', this.alignmentSelected)
    // if (align === 'bottom right') {
    //   this.alignmentSelected = 'right'
    //   console.log('»»» ALIGNMENT SELECTED ', this.alignmentSelected)
    // } else if (align === 'bottom left') {
    //   this.alignmentSelected = 'left'
    //   console.log('»»» ALIGNMENT SELECTED ', this.alignmentSelected)

    // }
  }

  copyToClipboard() {
    document.querySelector('textarea').select();
    document.execCommand('copy');
  }

  toggleCheckBox(event) {
    if (event.target.checked) {
      this.preChatForm = true;
      this.preChatFormValue = 'true'
      console.log('INCLUDE PRE CHAT FORM ', this.preChatForm)
    } else {
      this.preChatForm = false;
      this.preChatFormValue = 'false'
      console.log('INCLUDE PRE CHAT FORM ', this.preChatForm)
    }
  }

  // !! NO MORE USED
  // toggleCheckBoxCalloutTimer(event) {
  //   if (event.target.checked) {
  //     console.log('INCLUDE CALLOUT TIMER ', event.target.checked)
  //     this.calloutTimer = 'calloutTimer: 5';
  //     this.hasSelectedCalloutTimer = true
  //     console.log('CALLOUT TIMER VALUE  ', this.calloutTimer)
  //   } else {
  //     console.log('INCLUDE CALLOUT TIMER ', event.target.checked)
  //     this.calloutTimer = '';
  //     this.hasSelectedCalloutTimer = false
  //     console.log('CALLOUT TIMER VALUE ', this.calloutTimer)
  //   }
  // }

  // testWidget() {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   const options = new RequestOptions({ headers });
  //   // const url = 'http://support.chat21.org/testsite/?projectid=' + this.projectId + '&prechatform=' + this.preChatForm;
  //   const url = 'http://support.tiledesk.com/testsite/?projectid=' + this.projectId + '&prechatform=' + this.preChatForm;


  //   this.http.post(url, options).subscribe(data => {
  //     console.log('===== > POST WIDGET PAGE ', data);
  //   });
  // }



  testWidgetPage() {
    this.elementRef.nativeElement.blur();
    // http://testwidget.tiledesk.com/testsite/?projectid=5ad069b123c415001469574f&prechatform=false
    // + '&projectname=' + this.projectName
    // tslint:disable-next-line:max-line-length

    let calloutTitle = this._calloutTitle
    let paramCallout_title = '&callout_title='

    console.log('CALL OUT TITLE PARAMETER ', paramCallout_title, 'CALL OUT TITLE VALUE  ', calloutTitle);
    if (!this._calloutTitle) {
      paramCallout_title = '';
      calloutTitle = '';
      console.log('CALL OUT TITLE PARAMETER ', paramCallout_title, 'CALL OUT TITLE VALUE  ', calloutTitle);
    }

    let calloutMsg = this._calloutMsg;
    let paramCallout_msg = '&callout_msg='

    console.log('CALL OUT MSG PARAMETER ', paramCallout_msg, 'CALL OUT MSG VALUE  ', calloutMsg);
    if (!this._calloutMsg) {
      paramCallout_msg = '';
      calloutMsg = ''
      console.log('CALL OUT MSG PARAMETER ', paramCallout_msg, 'CALL OUT MSG VALUE  ', calloutMsg);
    }


    const url = 'http://testwidget.tiledesk.com/testsite?projectid='
      + this.projectId
      + '&prechatform=' + this.preChatForm
      + '&callout_timer=' + this.calloutTimerSecondSelected
      + '&themecolor=' + this.primaryColor
      + '&themeforegroundcolor=' + this.secondaryColor
      + paramCallout_title + calloutTitle
      + paramCallout_msg + calloutMsg
      + '&align=' + this.alignmentSelected;
    window.open(url, '_blank');
  }

  goToWidgetDesign() {
    this.router.navigate(['project/' + this.project._id + '/widget/design']);
  }

}
