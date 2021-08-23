define([
  'core/js/models/questionModel',
], function(QuestionModel) {

  var MoralMachineModel = QuestionModel.extend({
    
        init: function() {
          QuestionModel.prototype.init.call(this);
        },
    

      imagesImport: function() {
        this.set(this.get('scenario'));
    },
  
        canSubmit: function() {
          return true;
        },
    
        isCorrect: function() {
          return(this.get('_isCorrect'));
        },
    
        setupCorrectFeedback() {
          var context = { "stepCount": this.get("_stepCount") };
          this.set({
            feedbackTitle: this.getFeedbackTitle(),
            feedbackMessage: Handlebars.compile(this.get('_feedback').correct)(context)
          });
        },
    
        setAttemptSpecificFeedback(feedback) {
    
          this.set({
            feedbackTitle: this.getFeedbackTitle(),
            feedbackMessage: Handlebars.compile(body)(context)
          });
        }
    

      });
      return MoralMachineModel;
      
    });
    








    // updateCounts: function(id) {
    //   d3.json('../data.json', function(data) {
    //     const scenario = id - 1;
    //     const done = {};
    //     $.each(data.scenarios[scenario]['take-action'].scoring, function(index, value) {
    //       if (!done[value]) {
    //         if (!Number.isInteger(counts[value])) {
    //           counts[value] = 1;
    //         } else {
    //           counts[value] += 1;
    //         }
    //       }
    //     });
    //     $.each(data.scenarios[scenario]['no-action'].scoring, function(index, value) {
    //       if (!done[value]) {
    //         if (!Number.isInteger(counts[value])) {
    //           counts[value] = 1;
    //         } else {
    //           counts[value] += 1;
    //         }
    //       }
    //     });
    //     $.each(data.scenarios[scenario]['no-action'].saved.genders, function(index, value) {
    //       if (!Number.isInteger(counts.genders[value])) {
    //         counts.genders[value] = 1;
    //       } else {
    //         counts.genders[value] += 1;
    //       }
    //     });
    //     $.each(data.scenarios[scenario]['no-action'].saved.characters, function(index, value) {
    //       if (!Number.isInteger(counts.characters[value])) {
    //         counts.characters[value] = 1;
    //       } else {
    //         counts.characters[value] += 1;
    //       }
    //     });
    //     $.each(data.scenarios[scenario]['no-action'].killed.genders, function(index, value) {
    //       if (!Number.isInteger(counts.genders[value])) {
    //         counts.genders[value] = 1;
    //       } else {
    //         counts.genders[value] += 1;
    //       }
    //     });
    //     $.each(data.scenarios[scenario]['no-action'].killed.characters, function(index, value) {
    //       if (!Number.isInteger(counts.characters[value])) {
    //         counts.characters[value] = 1;
    //       } else {
    //         counts.characters[value] += 1;
    //       }
    //     });
    //   });
    // },

    // updateScores: function(id, intervention) {
    //   d3.json('/data.json', function(data) {
    //     const scenario = id - 1;
    //     // console.log(data);
    //     if (intervention) {
    //       $.each(data.scenarios[scenario]['take-action'].scoring, function(index, value) {
    //         if (!Number.isInteger(scores[value])) {
    //           scores[value] = 1;
    //         } else {
    //           scores[value] += 1;
    //         }
    //       });
    //       $.each(data.scenarios[scenario]['no-action'].killed.genders, function(index, value) {
    //         // console.log(value);
    //         if (!Number.isInteger(scores.Saved.genders[value])) {
    //           scores.Saved.genders[value] = 1;
    //         } else {
    //           scores.Saved.genders[value] += 1;
    //         }
    //       });
    //       $.each(data.scenarios[scenario]['no-action'].killed.characters, function(index, value) {
    //         // console.log(value);
    //         if (!Number.isInteger(scores.Saved.characters[value])) {
    //           scores.Saved.characters[value] = 1;
    //         } else {
    //           scores.Saved.characters[value] += 1;
    //         }
    //       });
    //       $.each(data.scenarios[scenario]['no-action'].saved.genders, function(index, value) {
    //         // console.log(value);
    //         if (!Number.isInteger(scores.Killed.genders[value])) {
    //           scores.Killed.genders[value] = 1;
    //         } else {
    //           scores.Killed.genders[value] += 1;
    //         }
    //       });
    //       $.each(data.scenarios[scenario]['no-action'].saved.characters, function(index, value) {
    //         // console.log(value);
    //         if (!Number.isInteger(scores.Killed.characters[value])) {
    //           scores.Killed.characters[value] = 1;
    //         } else {
    //           scores.Killed.characters[value] += 1;
    //         }
    //       });
    //     } else {
    //       $.each(data.scenarios[scenario]['no-action'].scoring, function(index, value) {
    //         if (!Number.isInteger(scores[value])) {
    //           scores[value] = 1;
    //         } else {
    //           scores[value] += 1;
    //         }
    //       });
    //       $.each(data.scenarios[scenario]['no-action'].killed.genders, function(index, value) {
    //         // console.log(value);
    //         if (!Number.isInteger(scores.Killed.genders[value])) {
    //           scores.Killed.genders[value] = 1;
    //         } else {
    //           scores.Killed.genders[value] += 1;
    //         }
    //       });
    //       $.each(data.scenarios[scenario]['no-action'].killed.characters, function(index, value) {
    //         // console.log(value);
    //         if (!Number.isInteger(scores.Killed.characters[value])) {
    //           scores.Killed.characters[value] = 1;
    //         } else {
    //           scores.Killed.characters[value] += 1;
    //         }
    //       });
    //       $.each(data.scenarios[scenario]['no-action'].saved.genders, function(index, value) {
    //         // console.log(value);
    //         if (!Number.isInteger(scores.Saved.genders[value])) {
    //           scores.Saved.genders[value] = 1;
    //         } else {
    //           scores.Saved.genders[value] += 1;
    //         }
    //       });
    //       $.each(data.scenarios[scenario]['no-action'].saved.characters, function(index, value) {
    //         // console.log(value);
    //         if (!Number.isInteger(scores.Saved.characters[value])) {
    //           scores.Saved.characters[value] = 1;
    //         } else {
    //           scores.Saved.characters[value] += 1;
    //         }
    //       });
    //     }
    //   }
    //   )}

// 		getAgePeference: function() {
// 			//console.log("Age");
// 			//console.log("Save young: " + scores["Save young"] + " " + getScoringPercentage(scores["Save young"],counts["Save young"]));
// 			//console.log("Save old: " + scores["Save old"] + " " + getScoringPercentage(scores["Save old"],counts["Save old"]));
// 			var agePref = getScoringPercentage(scores["Save old"],counts["Save old"]) - getScoringPercentage(scores["Save young"],counts["Save young"]);
// 			agePref = agePref / 2;
// 			agePref = agePref + 0.5;
// 			agePref = agePref * 100;
// 			return agePref;
// 		},
    
// 		getSpeciesPeference: function() {
// 			//console.log("Species");
// 			//console.log("Save pets: " + scores["Save pets"] + " " + getScoringPercentage(scores["Save pets"],counts["Save pets"]));
// 			//console.log("Save hoomans: " + scores["Save hoomans"] + " " + getScoringPercentage(scores["Save hoomans"],counts["Save hoomans"]));
// 			var agePref = getScoringPercentage(scores["Save pets"],counts["Save pets"]) - getScoringPercentage(scores["Save hoomans"],counts["Save hoomans"]);
// 			agePref = agePref / 2;
// 			agePref = agePref + 0.5;
// 			agePref = agePref * 100;
// 			return agePref;
// 		},
    
// 		getSocialPeference: function() {
// 			//console.log("Species");
// 			//console.log("Save pets: " + scores["Save pets"] + " " + getScoringPercentage(scores["Save pets"],counts["Save pets"]));
// 			//console.log("Save hoomans: " + scores["Save hoomans"] + " " + getScoringPercentage(scores["Save hoomans"],counts["Save hoomans"]));
// 			var agePref = getScoringPercentage(scores["Save robber"],counts["Save robber"]) - getScoringPercentage(scores["Save professional"],counts["Save professional"]);
// 			agePref = agePref / 2;
// 			agePref = agePref + 0.5;
// 			agePref = agePref * 100;
// 			return agePref;
// 		},
    
// 		getMostSKCharacter: function(sk,counts) {
// 			var highcount = 0.0;
// 			var highkey = [];
// 			$.each(sk, function(key, value) {
// 				var percent = value / counts[key];
// 				if (percent > highcount) {
// 					highkey = [];
// 					highcount = percent;
// 					highkey.push(key);
// 				} else if (percent == highcount) {
// 					highkey.push(key);
// 				}
// 			});
// 			return {
// 				"characters": highkey,
// 				"percent": highcount
// 			};
// 		},
    
// 		renderSKCharecters: function(element,characters,percent) {
// 			$.each(characters, function(key,value) {
// 				value = value.replace(" ","_");
// 				value = value.replace("(","");
// 				value = value.replace(")","");
// 				$('#'+element+ ' #'+value).show();
// 			});
// 		},
    
// 		getPreference: function(sk,counts) {
// 			var highcount = 0.0;
// 			var highkey = {};
// 			$.each(sk, function(key, value) {
// 				//console.log(key + " " + value + " / " + counts[key]);
// 				var percent = value / counts[key];
// 				highkey[key] = percent;
// 			});
// 			return highkey;
// 		},
  
// 		getScoringPercentage: function(count, total) {
      
// 			var temporaryVal = (count / total) * 100;
// 			if(globalResult.indexOf(temporaryVal) !== -1){
// 						//Do Nothing
// 				}else{
// 					//globalResult[globalResultCounter] = temporaryVal;
// 				//globalResultCounter = globalResultCounter+1;
// 				}
// 			globalResult[globalResultCounter] = temporaryVal;
// 			globalResultCounter = globalResultCounter+1;
        
// 			console.log((count / total) * 100);
      
// 			if (!count) {
// 				return 0;
// 			}
// 			return count / total;
// 		},

// 		 getGlobalResult: function(){
// 			return globalResult;
// 		},

//     CalculateResult: function() {
//       const results = {};
//       console.log('scores');
//       console.log(scores);
//       console.log('counts');
//       console.log(counts);

//       // insert value of most killed and saved into results object
//       results['Most killed'] = getMostSKCharacter(scores.Killed.characters, counts.characters);
//       results['Most saved'] = getMostSKCharacter(scores.Saved.characters, counts.characters);

//       // fix characters appereance
//       renderSKCharecters('mostSaved', results['Most saved'].characters, results['Most saved'].percent);
//       renderSKCharecters('mostKilled', results['Most killed'].characters, results['Most killed'].percent);

//       //
//       results['Gender preference (saved)'] = getPreference(scores.Saved.genders, counts.genders);
//       genderPref = (((results['Gender preference (saved)'].Male - results['Gender preference (saved)'].Female) / 2) + 0.5) * 100;
//       renderResult('right-50', 5, genderPref);
//       renderResult('left-50', 7, getAgePeference());
//       results['Save more lives'] = getScoringPercentage(scores['Save more lives'], counts['Save more lives']);
//       renderResult('left-50', 1, results['Save more lives'] * 100);
//       results['Save passengers'] = getScoringPercentage(scores['Save people in car'], counts['Save people in car']);
//       renderResult('right-50', 2, results['Save passengers'] * 100);
//       results['Avoid intervention'] = getScoringPercentage(scores['Avoid intervention'], counts['Avoid intervention']);
//       renderResult('left-50', 4, results['Avoid intervention'] * 100);
//       renderResult('right-50', 6, getSpeciesPeference());
//       renderResult('left-50', 9, getSocialPeference());
//       results['Uphold law'] = getScoringPercentage(scores['Uphold law'], counts['Uphold law']);
//       renderResult('right-50', 3, results['Uphold law'] * 100);

//       results.Global_Variable = getGlobalResult();

//       console.log('results');
//       console.log(results);
//     },

// 		renderResult: function(element,question,result) {
// 			var titles = [];
// 			titles.push("Saving more lives");
// 			titles.push("Protecting passengers");
// 			titles.push("Upholding the law");
// 			titles.push("Avoiding intervention");
// 			titles.push("Gender preference");
// 			titles.push("Species preference");
// 			titles.push("Age preference");
// 			titles.push("Fitness preference");
// 			titles.push("Social value preference");
// 			//console.log(element + " " + question + " " + result);
// 			style = "margin-left: " + result + "%;";
// 			if (result > 96) {
// 				style += " left: 0em;"
// 			}},

// });