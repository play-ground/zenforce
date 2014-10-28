(function() {

  return {

    requests: {
      fetchBookmarks: {
        url: '/api/v2/bookmarks.json',
        type: 'GET'
      },
    },

    events: {
      'app.activated':'showLeaderboard',
      'ticket.status.changed' : 'ticketStatusHookHandler',
      'ticket.save' : 'saveHookHandler',
    },

    showLeaderboard: function(data) {
      console.log("Loading app: " + this.ticket());
      this.switchTo('zen-force');
    },

    saveHookHandler: function(data) {
      console.log("User: " + this.currentUser().email() + " Saved a ticket: " + this.ticket().id());
      console.log("status " + this.ticket().status());
      console.log("priority " + this.ticket().priority());
      console.log("by " + this.ticket().assignee().user().email());
    },

    ticketStatusHookHandler: function(data) {
      console.log("Ticket status change: " + this.ticket().id());
    },

  };

}());
