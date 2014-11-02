(function() {

  return {
    backendUrl: "https://zenforce.herokuapp.com/",
    priorityMap: {
      '-': 2,
      'low': 1,
      'normal': 2,
      'high': 3,
      'urgent': 5
    },
    levels: {
      zengling: {
        name: "Zen-ling",
        icon: "vader"
      },
      zendawan: {
        name: "Zen-dawan",
        icon: "stormtrooper"
      },
      zendi:{
        name: "Zen Knight",
        icon: "luke"
      },
      zenmaster: {
        name: "Zen Master",
        icon: "ben"
      }
    },

    requests: {
      fetchUserDetails: function (args) {
        return {
          url: this.backendUrl + 'users/' + args.id + '/details.json',
          dataType: 'json',
          data: args,
          type: 'GET'
        };
      },
      fetchLeaderboard: function () {
        return {
          url: this.backendUrl + 'leaderboard.json',
          dataType: 'json',
          type: 'GET'
        };
      },
      addUserPoints: function (args) {
        return {
          url: this.backendUrl + 'users/' + args.id + '/allocate_points.json',
          dataType: 'json',
          data: args,
          type: 'POST'
        };
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
                          },
          finalData = undefined;

      console.log("Loading showLeaderboard");
      this.switchTo('loading_screen');

      this.ajax('fetchUserDetails', requestParams).done(function(details) {
        console.log("Got the user details: " + JSON.stringify(details) + "... getting leaderboard!");

        finalData = details;
        // Fix the Rank name
        finalData.rank = this.levels[finalData.rank].name;

        this.ajax('fetchLeaderboard')
          .done(function(leaderData) {
            console.log("Got the leaderboard: " + JSON.stringify(leaderData));
            finalData.leaderboard = leaderData.leaderboard;

            // Update the leaderboard with rankings from points
            for (i = 0; i < finalData.leaderboard.length; i++) {
              finalData.leaderboard[i].rank = "#" + (i+1);
              finalData.leaderboard[i].icon = this.levels["zengling"].icon;
              if (finalData.user.id == finalData.leaderboard[i].id) {
                finalData.leaderboard[i].highlight = "warning";
              }
            }
          }).fail(function () {
            console.log("Failed getting leaderboard!");
          }).always(function() {
            this.switchTo('zen-force', finalData);
          });
      }).fail(function () {
        services.notify("Failed to update Zenforce!", 'error', 2 * 1000);
      }).always(function() {
        this.switchTo('zen-force', finalData);
      });
    },

    saveHookHandler: function() {
      if (this.ticket().status() == "solved") {
        var requestParams = {
          name:  this.currentUser().name(),
          email: this.currentUser().email(),
          id:    this.currentUser().id(),
          external_id: this.currentUser().id(),
          points: this.priorityMap[this.ticket().priority()]
        };
        console.log("Send ticket solving to backend: " + JSON.stringify(requestParams));
        this.ajax('addUserPoints', requestParams).done(function () {
          if (this.ticket() != undefined) {
            services.notify("Updated Zenforce Points!", 'notice', 2 * 1000);
            this.showLeaderboard();
          }
        });
      }
    },
  };

}());
