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
        
        try {
          this._runModelCompatibleFunction('storeCollectiveData');
        } catch (err) {}

        // Disable submit button on load
        var $buttonsAction = this.$('.js-btn-action');
        Adapt.a11y.toggleEnabled($buttonsAction, false);
      },
      
      resetQuestion: function() {},

      getAssets: function () {
        let _items = this.model.get("_items");

        //left side
        var graphicLeft = _items[0]["scenario-left"]["_graphic"];
        //right side
        var graphicRight = _items[0]["scenario-right"]["_graphic"];

        //dom elements
        let leftImgEl = this.$(".left-img");
        let rightImgEl = this.$(".right-img");

        //setting first
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
        let _items = this.get("_items"),
            data = [],
            count = 0,
            $submitBtn = $(".moralMachine__inner > .btn__container > .btn__response-container > .btn__action"),
            $inputs = $(".moralMachine__item-input"),
            $labels = $(".moralMachine__item-label")
        onItemSelect = function(event) {
          console.log("onItemSelect")
        }

        data = flatten(data)
        console.log(count, data, _items)

        function flatten(input) {
          return input.reduce((a, b) => a.concat(b), []);
        }
        function getScoreLeft(count) {
          console.log("Score left")
          return _items[count]["scenario-left"]["scoring"][0]["choices"];
        }
        function getScoreRight(count) {
          console.log("Score right")
          return _items[count]["scenario-right"]["scoring"][0]["choices"];
        }
        function pushData(idk) {
          data.push(idk)
          data = flatten(data)
          newChoice()
          console.log(count, data)
          ++count
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
          $inputs.map((i, e) => {
            if(e != undefined)
              if(e.checked === true) {
                if(i === 0)
                  pushData(getScoreLeft(count))
                else
                  pushData(getScoreRight(count))
                $submitBtn.prop("disabled", true)
                $labels.filter('[data-adapt-index="' + i + '"]').toggleClass('is-selected', false)
                e.checked = false
                Adapt.a11y.toggleEnabled($submitBtn, false);

                // Send event to mcqView.js to update inputs
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
        function updateInput() {
          for(let i = 0; i < $inputs.length; i++) {
            var input = $inputs.filter('[data-adapt-index="' + i + '"]')
            var label = $labels.filter('[data-adapt-index="' + i + '"]')
            input.toggleClass('is-disabled', false)
            label.toggleClass('is-disabled', false)
  
            if(input[0].checked) {
              label
              .toggleClass('is-selected', true)
            } else {
              label
              .toggleClass('is-selected', false)
            }
          }
        }
        $labels.on("click", () => {
          if(count <= _items.length -1)
            $submitBtn.prop("disabled", false)
            
            setTimeout(() => {
              // Enable submit button
              if(count <= _items.length -1) {
                Adapt.a11y.toggleEnabled($submitBtn, true);
                $submitBtn.text("SUBMIT BUTTON")
                updateInput()
              }
              else
                $submitBtn.text("Test finished")
            }, 1)
        })
        
        $submitBtn.on("click", (e) => {
          submitChoice()
          setTimeout(() => {
            e.target.innerText = "SUBMIT BUTTON"
            if(count <= _items.length -1) {
              this.attributes._isEnabled = true
            } else {
              this.attributes._isEnabled = false
              $submitBtn.text("Test finished")
              for(let i = 0; i < $inputs.length; i++) {
                let $input = $inputs.filter('[data-adapt-index="' + i + '"]')
                let $label = $labels.filter('[data-adapt-index="' + i + '"]')
                $input.prop('disabled', true);
                $label.toggleClass('is-disabled', true);
              }
            }
          }, 1)
        })
      },
      
      setAttemptSpecificFeedback: function () {
        return false;
      },
    }),
  });
});
