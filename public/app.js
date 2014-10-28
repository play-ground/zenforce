(function() {

  return {
    events: {
      'app.activated':'showLeaderboard',
      'ticket.save' : 'saveHookHandler',
      'ticket.status.changed' : 'ticketStatusHookHandler'
    },

    showLeaderboard: function(data) {
      console.log("ticket: " + data);
      this.switchTo('zen-force');
    },

    saveHookHandler: function(data) {
      console.log("Saved a ticket: " + this.ticket().id());
      console.log("status " + this.ticket().status());
      console.log("by " + this.ticket().assignee().user().email());
    },

    ticketStatusHookHandler: function(data) {
      console.log("Ticket status change: " + this.ticket().id());
    },

  };

}());
