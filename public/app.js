(function() {

  return {
    name: "hello",

    requests: {
      fetchUserDetails: function (args) {
        return {
          url: 'https://stormy-crag-5102.herokuapp.com/users/' + args.id + '/details.json',
          dataType: 'json',
          data: args,
          type: 'GET'
        }
      },
      fetchLeaderboard: function () {
        return {
          url: 'https://stormy-crag-5102.herokuapp.com/leaderboard.json',
          dataType: 'json',
          type: 'GET'
        }
      },
      addUserPoints: function (args) {
        return {
          url: 'https://stormy-crag-5102.herokuapp.com/users/' + args.id + '/allocate_points.json',
          dataType: 'json',
          data: args,
          type: 'POST'
        }
      },
    },

    events: {
      'app.activated':'showLeaderboard',
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
      this.showSpinner(true);

      this.ajax('fetchUserDetails', requestParams).done(function(details) {
        console.log("Got the user details: " + JSON.stringify(details) + "... getting leaderboard!");

        this.ajax('fetchLeaderboard')
          .done(function(leaderData) {
            console.log("Got the leaderboard: " + JSON.stringify(leaderData));
            details.leaderboard = leaderData.leaderboard;
            this.switchTo('zen-force', details);
          }).fail(function () {
            console.log("Failed getting leaderboard!");
            this.switchTo('zen-force', details);
          }).always(function() {
            console.log("Stopping spinner");
            this.showSpinner(false);
          });
      });
    },

    saveHookHandler: function() {
      if (this.ticket().status() == "solved") {
        var requestParams = {
          name:  this.currentUser().name(),
          email: this.currentUser().email(),
          id:    this.currentUser().id(),
          external_id: this.currentUser().id(),
          points: this.ticket().priority()
        };
        console.log("Send ticket solving to backend: " + JSON.stringify(requestParams));
        this.ajax('addUserPoints', requestParams).done(function () {
          this.showLeaderboard();
        });
      }
    },

    showSpinner: function(show) {
      if (show) {
        this.$('.main').addClass('loading');
        this.$('.loading_spinner').css('display', 'block');
      } else {
        this.$('.main').removeClass('loading');
        this.$('.loading_spinner').css('display', 'none');
      }
    },
  };

}());
