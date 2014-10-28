(function() {

  return {

    requests: {
      fetchUserDetails: function (args) {
        return {
          url: 'http://localhost:3000/user/' + args.id + '.json',
          contentType: 'application/json',
          type: 'GET'
        }
      },
      fetchLeaderboard: {
        url: 'http://localhost:3000/leaderboard/',
        contentType: 'application/json',
        type: 'GET'
      },
    },

    events: {
      'app.activated':'showLeaderboard',
      'ticket.status.changed' : 'ticketStatusHookHandler',
      'ticket.save' : 'saveHookHandler',
    },

    showLeaderboard: function() {
      var requestParams = {
        name:  this.currentUser().name(),
        email: this.currentUser().email(),
        id:    this.currentUser().id(),
        external_id: this.currentUser().id(),
      };
      console.log("Loading app: " + this.ticket());
      this.ajax('fetchLeaderboard', requestParams).done(function(data) {
        var details = JSON.parse(data);
        console.log("Got the user details: " + data + "... getting leaderboard!");
        this.ajax('fetchUserDetails', requestParams).done(function(leaderData) {
          var leaderboard = JSON.parse(leaderData);
          console.log("Got the leaderboard: " + leaderData);
        });
      });
      this.switchTo('zen-force');
    },

    saveHookHandler: function(data) {
      console.log("Saved a ticket: " + this.ticket().id());
      console.log("status " + this.ticket().status());
      console.log("priority " + this.ticket().priority());
      console.log("by " + this.currentUser().id() + "/" + this.currentUser().email());
      if (this.ticket().status() == "solved") {
        requestParams.name = this.currentUser().name();
        requestParams.email = this.currentUser().email();
        requestParams.id = this.currentUser().id();
        requestParams.external_id = this.currentUser().id();
        console.log("Send ticket solving to backend: " + JSON.stringify(requestParams));
        this.ajax('fetchUserDetails', requestParams);
      }
    },

    ticketStatusHookHandler: function(data) {
      console.log("Ticket status change: " + this.ticket().id());
    },

  };

}());
