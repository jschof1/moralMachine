const { data } = require("jquery");

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
      },
      
      resetQuestion: function() {
        
        let _items = this.model.get("_items");

        count = 0;
        //left side
        var graphicLeft = _items[0]["scenario-left"]["_graphic"];
        //right side
        var graphicRight = _items[0]["scenario-right"]["_graphic"];
        var descLeft = _items[0]["scenario-left"]["description"];
        //right side
        var descRight = _items[0]["scenario-right"]["description"];

        //dom elements
        let leftImgEl = this.$(".left-img");
        let rightImgEl = this.$(".right-img");
        let descLeftEl = this.$(".left-text");
        let descRightEl= this.$(".right-text");

        //setting first
        leftImgEl.attr("src", graphicLeft);
        rightImgEl.attr("src", graphicRight);
        //descRight.text(_items[0]["scenario-right"]["description"]);
        //descLeft.text(_items[0]["scenario-left"]["description"]);

      },

      getAssets: function () {
        let _items = this.model.get("_items");

        //left side
        var graphicLeft = _items[0]["scenario-left"]["_graphic"];
        //right side
        var graphicRight = _items[0]["scenario-right"]["_graphic"];

        //dom elements
        let leftImgEl = this.$(".left-img");
        let rightImgEl = this.$(".right-img");
        let leftDesc = this.$(".left-text");
        let rightDesc = this.$(".right-text");

        //setting first
        leftImgEl.attr("src", graphicLeft);
        rightImgEl.attr("src", graphicRight);

        let i = 0;
        let j = 0;
        let k = 0;
        let l = 0;

        $(".btn-text").on("click", function () {
          console.log("Button was clicked")
        });
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
      // This function is called every time you click Submit,
      // so it is possible to create more than one data array,
      // causing duplicate console logs
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
          if(!(count > _items.length -1))
            return _items[count]["scenario-left"]["scoring"][0]["choices"];
          else console.log("Scenario does not exist")
        }
        function getScoreRight(count) {
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
        }
        function newChoice () {
          
          if(!(count +1 > _items.length -1)) {
            let imgLeft = this.$(".left-img");
            let imgRight = this.$(".right-img");
            let descLeft = this.$(".left-text");
            let descRight= this.$(".right-text");
  
              descRight.text(_items[count +1]["scenario-right"]["description"]);
              descLeft.text(_items[count +1]["scenario-left"]["description"]);
              imgLeft.attr("src", _items[count +1]["scenario-left"]["_graphic"]);
              imgRight.attr("src", _items[count +1]["scenario-right"]["_graphic"]);
          } else console.log("There are no more scenarios")
          // Here you could trigger something to end the test
          // And you should make the test impossible to click again
        }
        let scoreLeft = _items[0]["scenario-left"]["scoring"][0]["choices"];
        let scoreRight = _items[0]["scenario-right"]["scoring"][0]["choices"];
        
        //if clicked on left side push scoreLeft to array
        // maybe change .left-img and use the entire div instead
        // The way it is now it doesn't count when the user clicks the button.
        $(".odd").on("click", function () {
          pushData(getScoreLeft(count))
        });

        //if click on right side push scoreRight to array
        $(".even").on("click", function () {
          pushData(getScoreRight(count))
        });

        $(".btn-text").on("click", () => {
          resetData()
        })
      },

      setScore: function () {
        this.storeCollectiveData();
      },

      
      setAttemptSpecificFeedback: function () {
        return false;
      },

      onSubmit: function () {
        this.setScore();
      },
    }),
  });
});
