define([
  'core/js/models/questionModel',
], function(QuestionModel) {

  var MoralMachineModel = QuestionModel.extend({
    
        init: function() {
          QuestionModel.prototype.init.call(this);
        },
    
    storageObject: function() {
      var counterObject = {
        "Uphold law": 0,
        "avoid intervention": 0,
        "Save people in car": 0,
        "Save old": 0,
        "Save young": 0,
        "Save more people": 0,
        "Save humans": 0,
        "Save pets": 0,
        "Save professionals": 0,
        "Save robbers": 0
      };
    },
  
        canSubmit: function() {
          return true;
        },
    
        isCorrect: function() {
          return(this.get('_isCorrect'));
        },
    
        setupCorrectFeedback() {
          this.set({
            feedbackTitle: this.getFeedbackTitle(),
            feedbackMessage: Handlebars.compile(this.get('_feedback').correct)(context)
          });
        },
  
    

      });
      return MoralMachineModel;
      
    });
  