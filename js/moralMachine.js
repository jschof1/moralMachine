define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  var MoralMachineView = ComponentView.extend({
      postRender: function() {
        console.log("coshema")
        this.getAssets();
        // this.setScenarios();
          // this.clickEvent();
          this.setReadyStatus();
          this.setupInviewCompletion();
      },
      getAssets : function() {


        let scenario = this.model.get('scenario');
        console.log(scenario[1]["scenario-left"]["description"])
  
        // console.log(scenario);
        // console.log(scenario[0]['scenario-left']['direction'][0]['Direction type']);
        // console.log(scenario[0]['scenario-left']['scoring'][0]['choices']);
        // console.log(scenario[0]['scenario-right']['direction'][0]['Direction type']);
        // console.log(scenario[0]['scenario-right']['scoring'][0]['choices']);
      
        //left side
        var graphicLeft = scenario[0]["scenario-left"]["_graphic"]
        var descriptionLeft = scenario[0]["scenario-left"]["description"]
        var scoreLeft = scenario[0]["scenario-left"]["scoring"]
        console.log(descriptionLeft)
        //right side
        var savedCharactersLeft = scenario[0]["scenario-left"]["saved characters"]
  
        var killedCharactersLeft = scenario[0]["scenario-left"]["killed characters"]
  
        var graphicRight = scenario[0]["scenario-right"]["_graphic"];
        var descriptionRight = scenario[0]["scenario-right"]["description"];
        var scoreRight = scenario[0]["scenario-right"]["scoring"];
        var savedCharactersRight = scenario[0]["scenario-right"]["saved characters"];
        var killedCharactersRight = scenario[0]["scenario-right"]["killed characters"];
        
        let desc = this.$(".description");
        let leftImgEl = this.$("#scenario-left"); 
        let rightImgEl = this.$("#scenario-right");

        //setting first 

        desc.text(descriptionLeft);
  
        leftImgEl.attr("src", graphicLeft);
        rightImgEl.attr("src", graphicRight);


        let i = 0
        let j = 0
        let k = 0
        let l = 0
    
        if (i < scenario.length) {
          $('#scenario-left, #scenario-right').on("click", function () {
            console.log('clicked')

            
            desc.text(scenario[i+=1]["scenario-left"]["description"]);
            leftImgEl.attr("src", scenario[++j]["scenario-left"]["_graphic"]);
            rightImgEl.attr("src", scenario[++k]["scenario-right"]["_graphic"]);
  
            leftImgEl.attr("scenario", ++l)
            rightImgEl.attr("scenario", ++l)
  
          });
        } if (i == scenario.length) {
          return console.log("done");
        }
        
      },

  
      // setScenarios : function () {
      //   this.getAssets();
      //   let desc = $(".description");
      //   let leftImgEl = $("#scenario-left"); 
      //   let rightImgEl = $("#scenario-right");
      // },


      // clickEvent : function () {
      //   this.setScenarios()
      //   let i = 0
      //   console.log('coshema')
      //   if (i < scenario.length) {
      //     $('#scenario-left, #scenario-right').on("click", function () {
      //       console.log('clicked')
      //       // desc.text(scenario[++f][2]);
            
      //       // leftImgEl.attr("src", objToArr[++j][0]);
      //       // rightImgEl.attr("src", objToArr[++x][1]);
  
      //       // leftImgEl.attr("scenario", ++y)
      //       // rightImgEl.attr("scenario", ++y)
  
      //     });
      //   } else if (i == objToArr.length) {
      //     console.log("done");
      //   }
      // },

  });

  var MoralMachineModel = ComponentModel.extend({
      // Implement your component model
  });

  return Adapt.register('moralMachine', {
      model: MoralMachineModel,
      view: MoralMachineView
  });

});
