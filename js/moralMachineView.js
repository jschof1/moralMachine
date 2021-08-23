define([
  'core/js/views/questionView',
], function(QuestionView) {

  const MoralMachineView = QuestionView.extend({


  
    resetQuestionOnRevisit: function() {
      this.resetQuestion();
    },

    onQuestionRendered: function() {
			this.getAsset()
    },

    
    getAssets: function() {
      let scenario = this.model.get('scenario');
      console.log(scenario);

      var graphicLeft = scenario[0]["scenario-left"]["_graphic"];
      var descriptionLeft = scenario[0]["scenario-left"]["description"]
      var scoreLeft = scenario[0]["scenario-left"]["scoring"]
      var savedCharactersLeft = scenario[0]["scenario-left"]["saved characters"]
      var killedCharactersLeft = scenario[0]["scenario-left"]["killed characters"]

      var graphicRight = scenario[0]["scenario-right"]["_graphic"];
      var descriptionRight = scenario[0]["scenario-right"]["description"]
      var scoreRight = scenario[0]["scenario-right"]["scoring"]
      var savedCharactersRight = scenario[0]["scenario-right"]["saved characters"]
      var killedCharactersRight = scenario[0]["scenario-right"]["killed characters"]
      
      console.log("graphicLeft: " + graphicLeft);
      console.log("graphicRight: " + graphicRight);
    },

    enableSwapping: function () {
      var _self = this;
      this.model.on('change:scenario', function (model, scenario) {
        _self.render();
      }, this);
      _self.enableSwapping(this);
    },

  });

    return MoralMachineView;
  
  });
  
    // postRender: function() {
    // // create empty object which contains the genders and characters killed and saved
    //   const scores = {};
    //   scores.Saved = {};
    //   scores.Saved.genders = {};
    //   scores.Saved.characters = {};
    //   scores.Killed = {};
    //   scores.Killed.genders = {};
    //   scores.Killed.characters = {};
    // },

    // // count the number of characters and genders killed and saved

    // setResultsObject: function() {
    //   const counts = {};
    //   counts.genders = {};
    //   counts.characters = {};
    // },

    // resetQuestionOnRevisit: function() {
    //   this.resetQuestion();
    // },

    // resetQuestion: function() {
		// 	this.setFirstImage(0);
    // },

    // setFirstImage: function(id) {

    //   var scenario = this.model.get("scenario");
    //   var graphicLeft = scenario[id]["left"]["_graphic"]["large"];
		// 	var graphicRight = scenario[id]["right"]["_graphic"]["large"];

		// 	$('#background-left').html(`<img id="left" src=${graphicLeft}/>`);
    //   $('#background-right').html(`<img id="right" src=${graphicRight}/>`);
    // },

		// setOrder: function() {
		// 	function insertId(side){
    //     $(side).on('click', function() {
    //     $('#background-left').children().fadeOut(function() {
    //       this.remove();
    //     })
    //     $('#background-right').fadeOut(1000);
    //     $('#background-left').fadeIn(1000);
    //     $('#background-right').fadeIn(1000); 
    //   });
    // }}

    // nextScenario: function(id) {
    //   // get JSON data
    //   d3.json('../data.json', function(data) {
    //     const next = parseInt(id) + 1;
    //     const scenario = parseInt(id);
    //     const sides = ['left', 'right'];
    //     let random = 0;
		// 		let images = this.model.get('_graphics');
    //     // determine which image to show
    //     if (scenario > 0) {
    //       random = Math.floor(Math.random() * 2);
    //     }
    //     // check if the scenario is the last one
    //     // setting left background image
    //     else {
    //       // get the img tag inside of the background image div and fade it out
    //       $('#background-left').children().fadeOut(function() {
    //         this.remove();
    //         // if left side
    //         if (sides[random] == 'left') {
    //           // get description and insert description into a div
    //           const description = data.scenarios[scenario]['long-description'];
    //           var descriptionHtml = `<div class="custom-text-bottom">${description}</div>`;
    //           // set background image to left side
    //           $('#background-left').css('background-image', 'url("../../../course/en/images/moralMachine/L.png")');
    //           // change scenario number of background image
    //           $('#background-left').html('<img id="left" scenario="' + next + '" src="img/scenarios/' + next + '-l.png"/>');
    //           // place description div into a container div with p tags
    //           $('.scenario-container').html(`<p class="scenario-text"> ${descriptionHtml} </p>`);
    //           // when image is clicked, update scores and counts objects by calling their respective functions
    //           // call next scenario function
    //           $('#left').click(function() {
    //             this.updateScores($(this).attr('scenario'), false);
    //             this.updateCounts($(this).attr('scenario'));
    //             this.nextScenario($(this).attr('scenario'));
    //           });
    //         } else {
    //           const description = data.scenarios[scenario]['long-description'];
    //           let descriptionHtml = `<div class="custom-text-bottom">${description}</div>`;
    //           $('#background-left').css('background-image', 'url("../../../course/en/images/moralMachine/R.png")');
    //           $('#background-left').html('<img id="right" scenario="' + next + '" src="../../../course/en/images/moralMachine/scenarios/' + next + '-l.png"/>');
    //           $('.scenario-container').html(`<p class="scenario-text"> ${descriptionHtml} </p>`);
    //           $('#right').on('click', function() {
    //             this.updateScores($(this).attr('scenario'), true);
    //             this.updateCounts($(this).attr('scenario'));
    //             this.nextScenario($(this).attr('scenario'));
    //           });
    //         }
    //       });

    //       $('#background-right').children().fadeOut(function() {
    //         this.remove();
    //         if (sides[random] == 'left') {
    //           $('#background-right').css('background-image', 'url("../../../course/en/images/moralMachine/R.png")');
    //           $('#background-right').html('<img id="right" scenario="' + next + '" src="../../../course/en/images/moralMachinescenarios/' + next + '-r.png"/>');
    //           $('#right').on('click', function() {
    //             this.updateScores($(this).attr('scenario'), true);
    //             this.updateCounts($(this).attr('scenario'));
    //             this.nextScenario($(this).attr('scenario'));
    //           });
    //         } else {
    //           $('#background-right').css('background-image', 'url("../../../course/en/images/moralMachine/L.png")');
    //           $('#background-right').html('<img id="left" scenario="' + next + '" src="../../../course/en/images/moralMachine/scenarios/' + next + '-l.png"/>');
    //           $('#left').on('click', function() {
    //             this.set.model.updateScores($(this).attr('scenario'), false);
    //             this.set.model.updateCounts($(this).attr('scenario'));
    //             this.nextScenario($(this).attr('scenario'));
    //           });
    //         }
    //       });
    //     }
    //   });
    // }

