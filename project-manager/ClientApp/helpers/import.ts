import gapi from 'gapi-client';

export class GoogleImport {
    private API_KEY: string = 'AIzaSyAr11E6XmWq6y4sAfY-wfazXfslt-nerCk';
    private CLIENT_ID: string = '141698948941-dm3gqmue1pen4iabdublg80k6c0scb1t.apps.googleusercontent.com';
    private DISCOVERY_DOCS: string[] = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    private SCOPES: string = "https://www.googleapis.com/auth/calendar.readonly";

    public init = () => {
        if(gapi.client){
            if(this.IsSignIn()){
                gapi.auth2.getAuthInstance().signOut();
            }
        }else{
            gapi.load('client:auth2', this.initClient);
        }   
    }

    public IsSignIn = (): boolean => {
        return gapi.auth2.getAuthInstance().isSignedIn.get();
    }

    public signIn = () => {
        if(this.IsSignIn()){
            this.GetEvents();
        }
        else{
            gapi.auth2.getAuthInstance().signIn();
        }
    }

    public OnListEvents: Function|null = null;

    public GetEvents = () => {
        if(this.IsSignIn()){
            gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
              }).then((response: any) => {
                  var events = response.result.items;
                  if(this.OnListEvents){
                    this.OnListEvents(events);
                  }
              })
        }
    }

    private initClient = () => {
        gapi.client.init({
          apiKey: this.API_KEY,
          clientId: this.CLIENT_ID,
          discoveryDocs: this.DISCOVERY_DOCS,
          scope: this.SCOPES
        }).then(() => {
            console.log('init');
            gapi.auth2.getAuthInstance().isSignedIn.listen((signin:boolean) => {console.log(signin); if(signin) this.GetEvents() });
            if(this.IsSignIn()){
                gapi.auth2.getAuthInstance().signOut();
            }
        });
      }
}