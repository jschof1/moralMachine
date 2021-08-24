define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  var MoralMachineView = ComponentView.extend({
      postRender: function() {
        console.log("coshema")

          this.getAssets()
          this.setFirst()
          this.clickEvent()
          this.setReadyStatus();
          this.setupInviewCompletion();
      },
      getAssets : function() {
      

        let scenario = this.model.get('scenario');
  
        // console.log(scenario);
        // console.log(scenario[0]['scenario-left']['direction'][0]['Direction type']);
        // console.log(scenario[0]['scenario-left']['scoring'][0]['choices']);
        // console.log(scenario[0]['scenario-right']['direction'][0]['Direction type']);
        // console.log(scenario[0]['scenario-right']['scoring'][0]['choices']);
      
        //left side
        var graphicLeft = scenario[0]["scenario-left"]["_graphic"]
        var descriptionLeft = scenario[0]["scenario-left"]["description"][0]
        var scoreLeft = scenario[0]["scenario-left"]["scoring"]
  
        var savedCharactersLeft = scenario[0]["scenario-left"]["saved characters"]
  
        var killedCharactersLeft = scenario[0]["scenario-left"]["killed characters"]
  
        var graphicRight = scenario[0]["scenario-right"]["_graphic"];
        var descriptionRight = scenario[0]["scenario-right"]["description"];
        var scoreRight = scenario[0]["scenario-right"]["scoring"];
        var savedCharactersRight = scenario[0]["scenario-right"]["saved characters"];
        var killedCharactersRight = scenario[0]["scenario-right"]["killed characters"];
        
        console.log("graphicLeft: " + graphicLeft);
        console.log("graphicRight: " + graphicRight);
      },

      setFirst : function () {
        this.setScenarios()
        getAssets();

        desc.text(descriptionLeft);
  
        leftImgEl.attr("src", graphicLeft);
        rightImgEl.attr("src", graphicRight);
      },

      setScenarios : function () {
        const desc = $(".description");
        const leftImgEl = $("#scenario-left"); 
        const rightImgEl = $("#scenario-right");
    
  
        
        

       
      },

      clickEvent : function () {
        let i 

        this.getAssets()
        console.log('coshema')
        if (i < scenario.length) {
          $('#scenario-left, #scenario-right').on("click", function () {
            console.log('clicked')
            desc.text(scenario[++f][2]);
            
            leftImgEl.attr("src", objToArr[++j][0]);
            rightImgEl.attr("src", objToArr[++x][1]);
  
            leftImgEl.attr("scenario", ++y)
            rightImgEl.attr("scenario", ++y)
  
          });
        } else if (i == objToArr.length) {
          console.log("done");
        }
      },

  });

  var MoralMachineModel = ComponentModel.extend({
      // Implement your component model
  });

  return Adapt.register('moralMachine', {
      model: MoralMachineModel,
      view: MoralMachineView
  });

});
