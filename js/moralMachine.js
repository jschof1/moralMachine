define([
  "core/js/adapt",
  "components/adapt-contrib-mcq/js/adapt-contrib-mcq",
], function (Adapt, Mcq) {
  var moralMachine = Mcq.view.extend(
    {
      onQuestionRendered: function () {
        Mcq.view.prototype.setupQuestion.call(this);
        this.getAssets();
        this.resizeImage(Adapt.device.screenSize);
        this.setUpColumns();
        this.$(".js-item-label").imageready(this.setReadyStatus.bind(this));

        var $buttonsAction = this.$('.js-btn-action');
        Adapt.a11y.toggleEnabled($buttonsAction, false);
      },
      resetQuestion: function() {
        
        let _items = this.model.get("_items");

        count = 0;

        var graphicLeft = _items[0]["scenario-left"]["_graphic"];

        var graphicRight = _items[0]["scenario-right"]["_graphic"];
        var descLeft = _items[0]["scenario-left"]["description"];

        var descRight = _items[0]["scenario-right"]["description"];


        let leftImgEl = this.$(".left-img");
        let rightImgEl = this.$(".right-img");
        let descLeftEl = this.$(".left-text");
        let descRightEl= this.$(".right-text");


        leftImgEl.attr("src", graphicLeft);
        rightImgEl.attr("src", graphicRight);



      },

      getAssets: function () {
        let _items = this.model.get("_items");


        var graphicLeft = _items[0]["scenario-left"]["_graphic"];

        var graphicRight = _items[0]["scenario-right"]["_graphic"];


        let leftImgEl = this.$(".left-img");
        let rightImgEl = this.$(".right-img");
        let leftDesc = this.$(".left-text");
        let rightDesc = this.$(".right-text");


        leftImgEl.attr("src", graphicLeft);
        rightImgEl.attr("src", graphicRight);
      },

      resizeImage: function (width) {
        var imageWidth = width === "medium" ? "small" : width;

        this.$(".js-item-label").each(function (index) {
          var $img = $(this).find("img");
          var newSrc = $img.attr("data-" + imageWidth);
          if (!newSrc) return;
          $img.attr("src", newSrc);
        });
      },

      setUpColumns: function () {
        var columns = 2;

        var isLarge = Adapt.device.screenSize === "large";

        this.$el.toggleClass("has-column-layout", isLarge);
        this.$(".js-moralMachine-item").css(
          "width",
          isLarge ? 100 / columns + "%" : ""
        );
      },
    },
    {
      template: "moralMachine",
    }
  );

  return Adapt.register("moralMachine", {
    view: moralMachine,
    model: Mcq.model.extend({
      storeCollectiveData: function () {
        let _items = this.get("_items");
        let data = []
        let count = 0;

        data = flatten(data)
        console.log(count, data, _items)

        function flatten(input) {
          return input.reduce((a, b) => a.concat(b), []);
        }
        function getScoreLeft(count) {
          console.log("Score left")
  
  
          if(!(count > _items.length -1))
            return _items[count]["scenario-left"]["scoring"][0]["choices"];
          else console.log("Scenario does not exist")
        }
        function getScoreRight(count) {
          console.log("Score right")
  
  
          if(!(count > _items.length -1))
            return _items[count]["scenario-right"]["scoring"][0]["choices"];
          else console.log("Scenario does not exist")
        }
        function pushData(idk) {
  
  
          if(!(count > _items.length -1)) {
            data.push(idk)
            data = flatten(data)
            newChoice()
            console.log(count, data)
            ++count
          }
          else console.log("Test finished.")
        }
        function resetData() {
          data = []
          count = 0
          newChoice(count)
        }
        function newChoice (number= count +1) {
          if(!(number > _items.length -1)) {
            let imgLeft = this.$(".left-img");
            let imgRight = this.$(".right-img");
            let descLeft = this.$(".left-text");
            let descRight= this.$(".right-text");
  
              descRight.text(_items[count +1]["scenario-right"]["description"]);
              descLeft.text(_items[count +1]["scenario-left"]["description"]);
              imgLeft.attr("src", _items[count +1]["scenario-left"]["_graphic"]);
              imgRight.attr("src", _items[count +1]["scenario-right"]["_graphic"]);
          } else {
            let imgLeft = this.$(".left-img");
            let imgRight = this.$(".right-img");
            let descLeft = this.$(".left-text");
            let descRight= this.$(".right-text")
            let overImg = "https://i.ibb.co/0nycRWg/game-over.png";

            imgLeft.attr("src", overImg).fadeIn();
            imgRight.attr("src", overImg).fadeIn();
           
            descRight.text("No more scenarios left").fadeIn();
            descLeft.text("No more scenarios left").fadeIn();
            
            $(".moralMachine__button").hide();
            $(".moralMachine__item-option").hide();
          }
        }
        function submitChoice() {
          var inputs = $(".moralMachine__item-input")
          inputs.map((i, e) => {
            if(e != undefined)
              if(e.checked === true) {
                if(i === 0)
                  pushData(getScoreLeft(count))
                else
                  pushData(getScoreRight(count))
                e.checked = false
                var $buttonsAction = this.$('.js-btn-action');
                Adapt.a11y.toggleEnabled($buttonsAction, false);

                let eventBody = {}
                if(!(count > _items.length -1))
                  eventBody.isEnabled = true
                else
                  eventBody.isEnabled = false
                let resetInputs = new CustomEvent("reset-inputs", {detail: eventBody})
                document.dispatchEvent(resetInputs)
              }
          })
        }
        
        $(".btn-text").on("click", () => {
          submitChoice()
        })
      },

      
/* 
      setScore: function () {

      },
 */
      
      setAttemptSpecificFeedback: function () {
        return false;
      },
    }),
  });
});
