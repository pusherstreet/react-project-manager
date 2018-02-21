import gapi from 'gapi-client';

export class GoogleImport {
    private API_KEY: string = 'AIzaSyAr11E6XmWq6y4sAfY-wfazXfslt-nerCk';
    private CLIENT_ID: string = '141698948941-dm3gqmue1pen4iabdublg80k6c0scb1t.apps.googleusercontent.com';
    private DISCOVERY_DOCS: string[] = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    private SCOPES: string = "https://www.googleapis.com/auth/calendar.readonly";

    public init = () => {
        gapi.load('client:auth2', this.initClient);
    }

    public IsSignIn = (): boolean => {
        return gapi.auth2.getAuthInstance().isSignedIn.get();
    }

    public signIn = () => {
        if(this.IsSignIn){
            this.listUpcomingEvents()
        }
        else{
            gapi.auth2.getAuthInstance().signIn();
        }
    }

    public OnListEvents: Function|null = null;

    public signOut = () => {
        gapi.getAuthInstance.signOut();
    }

    public listUpcomingEvents = () => {
        if(this.IsSignIn){
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
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.listUpcomingEvents);
            console.log('init');
        });
      }
}