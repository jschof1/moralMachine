define([
  "core/js/adapt",
  "components/adapt-contrib-mcq/js/adapt-contrib-mcq"
], function (Adapt, Mcq) {
  var moralMachine = Mcq.view.extend(
    {
      onQuestionRendered: function () {
        Mcq.view.prototype.setupQuestion.call(this);
        this.storeUserAnswer();
        this.restoreUserAnswer();
        this.storeCollectiveData();
        this.getAssets();
        this.resizeImage(Adapt.device.screenSize);
        this.setUpColumns();
        this.$(".js-item-label").imageready(this.setReadyStatus.bind(this));
        
        // Disable submit button on load
        var $buttonsAction = this.$('.js-btn-action');
        Adapt.a11y.toggleEnabled($buttonsAction, false);
      },

      restoreUserAnswer: function () {
        let _items = this.model.get("_items");
        let imgLeft = $(".left-img");
        let imgRight = $(".right-img");
        let descLeft = $(".left-text");
        let descRight= $(".right-text");
        let count = this.getAssets()
        console.log(count)

        if (!(count > _items.length -1)) {
            descLeft.text(_items[count]["scenario-left"]["description"]);
            descRight.text(_items[count]["scenario-left"]["description"]);
            imgLeft.attr("src", _items[count]["scenario-left"]["_graphic"]);
            imgRight.attr("src", _items[count]["scenario-right"]["_graphic"]);
            console.log(count)
          } else {
            let imgLeft = this.$(".left-img");
            let imgRight = this.$(".right-img");
            let descLeft = this.$(".left-text");
            let descRight= this.$(".right-text")
            let overImg = "https://i.ibb.co/cbzXbpr/game-over.png";

            imgLeft.attr("src", overImg).css("border", "5px solid grey")
            imgRight.attr("src", overImg).css("border", "5px solid grey")

            descRight.text("No more scenarios left");
            descLeft.text("No more scenarios left");
            
            $(".moralMachine__button").hide();
            $(".moralMachine__item-option").hide();
        }
      },

      getAssets: function () {
        
        let _items = this.model.get("_items");
        let count = 0
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
        

        $('.btn-text').on("click", function () {
          ++count 
        })
        return count
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
      storeCollectiveData: function () {
        let _items = this.model.get("_items"),
            data = [],
            count = 0,
            userAnswers = {
              "age-preference": {
                "Save young": 0,
                "Save old": 0
              },
              "saving-more-lives": {
                "Save less people": 0,
                "Save more people": 0
              },
              "gender-preference": {
                "Men": 0,
                "Woman": 0
              },
              "protecting-passengers": {
                "Save people in car": 0,
                "Save pedestrians": 0
              },
              "species-preference": {
                "Save humans": 0,
                "Save animals": 0
              },
              "upholding-the-law": {
                "Uphold Law": 0,
                "Disobey Law": 0
              },
              "social-value-preference": {
                "authority": 0,
                "crime": 0
              },
              "avoiding-intervention": {
                "Intervene": 0,
                "Avoid Intervention": 0
              },
              "general-preference": {
                "Most saved": "",
                "Most Killed": ""
              }
            },
            $submitBtn = $(".moralMachine__inner > .btn__container > .btn__response-container > .btn__action"),
            $inputs = $(".moralMachine__item-input"),
            $labels = $(".moralMachine__item-label")
        // onItemSelect = function(event) {
        //   console.log("onItemSelect")
        // }

        data = flatten(data)
        function flatten(input) {
          return input.reduce((a, b) => a.concat(b), []);
        }
        function getScoreLeft(count) {
          // console.log("Score left")
          return _items[count]["scenario-left"]["scoring"][0]["choices"];
        }
        function getScoreRight(count) {
          // console.log("Score right")
          return _items[count]["scenario-right"]["scoring"][0]["choices"];
        }
        
        function pushData(choice) {
          let array = [].concat(choice)
          console.log("Array", array)
          array.map(v => {
            switch(v) {
              case "Save old": {
                userAnswers["age-preference"]["Save old"]++
                break;
              }
              case "Save young": {
                userAnswers["age-preference"]["Save young"]++
                break;
              }
              case "Save less people": {
                userAnswers["saving-more-lives"]["Save less people"]++
                break;
              }
              case "Save more people": {
                userAnswers["saving-more-lives"]["Save more people"]++
                break;
              }
              case "Men": {
                userAnswers["gender-preference"].Men++
                break;
              }
              case "Woman": {
                userAnswers["gender-preference"].Woman++
                break;
              }
              case "Save pedestrians": {
                userAnswers["protecting-passengers"]["Save pedestrians"]++
                break;
              }
              case "Save people in car": {
                userAnswers["protecting-passengers"]["Save people in car"]++
                break;
              }
              case "Save pedestrians": {
                userAnswers["species-preference"]["Save animals"]++
                break;
              }
              case "Save people in car": {
                userAnswers["species-preference"]["Save humans"]++
                break;
              }
              case "Disobey Law": {
                userAnswers["upholding-the-law"]["Disobey Law"]++
                break;
              }
              case "Uphold Law": {
                userAnswers["upholding-the-law"]["Uphold Law"]++
                break;
              }
              case "authority": {
                userAnswers["social-value-preference"].authority++
                break;
              }
              case "crime": {
                userAnswers["social-value-preference"].crime++
                break;
              }
              case "Intervene": {
                userAnswers["avoiding-intervention"]["Intervene"]++
                break;
              }
              case "Avoid Intervention": {
                userAnswers["avoiding-intervention"]["Avoid Intervention"]++
                break;
              }
            }
          })
          data.push(choice)
          data = flatten(data)
          newChoice()
          ++count
          console.log(count)
        }
        function newChoice (number = count +1) {
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
              let overImg = "https://i.ibb.co/cbzXbpr/game-over.png";
  
              imgLeft.attr("src", overImg).css("border", "5px solid grey")
              imgRight.attr("src", overImg).css("border", "5px solid grey")

              descRight.text("No more scenarios left");
              descLeft.text("No more scenarios left");
              
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
        return userAnswers
      },

      
      storeUserAnswer: function() {
        var answers = this.storeCollectiveData();
        this.model.set("_userAnswer", answers);
        return answers
      },

      setAttemptSpecificFeedback: function () {
        return false;
      },
    },
    {
      template: "moralMachine",
    }
  );

  return Adapt.register("moralMachine", {
    view: moralMachine,

    model: Mcq.model.extend({

    }),
  });
});
