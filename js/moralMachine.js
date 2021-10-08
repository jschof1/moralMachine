define([
  "core/js/adapt",
  "components/adapt-contrib-mcq/js/adapt-contrib-mcq",
], function (Adapt, Mcq) {

  let userAnswers = {
    "age-preference": {
      "Save young": 0,
      "Save old": 0,
    },
    "saving-more-lives": {
      "Save less people": 0,
      "Save more people": 0,
    },
    "gender-preference": {
      Men: 0,
      Woman: 0,
    },
    "protecting-passengers": {
      "Save people in car": 0,
      "Save pedestrians": 0,
    },
    "species-preference": {
      "Save humans": 0,
      "Save animals": 0,
    },
    "upholding-the-law": {
      "Uphold Law": 0,
      "Disobey Law": 0,
    },
    "social-value-preference": {
      authority: 0,
      crime: 0,
    },
    "avoiding-intervention": {
      Intervene: 0,
      "Avoid Intervention": 0,
    },
    "general-preference": {
      "Most saved": "",
      "Most Killed": "",
    },
  };

  let count = 0;

  let data = [];

  let options = {
    "Avoid Intervention":  38780,
    "Save people in car": 98202,
    "Save old": 89237,
    "Save young": 42374,
    "Save more people": 19273,
    "Save humans": 50283,
    "Save pets": 33495,
    "Save professionals": 77231,
    "Save robbers": 66842,
    "Uphold law": 12079
  };

    let counts = []

    let userCounts

  var moralMachine = Mcq.view.extend(
    {
      onQuestionRendered: function () {
        Mcq.view.prototype.setupQuestion.call(this);
        this.storeCollectiveData();
        this.restoreUserAnswer();
        this.convert()
        this.resizeImage(Adapt.device.screenSize);
        this.setUpColumns();
        this.$(".js-item-label").imageready(this.setReadyStatus.bind(this));
        // Disable submit button on load
        var $buttonsAction = this.$(".js-btn-action");
        Adapt.a11y.toggleEnabled($buttonsAction, false);
      },

      convert: function () {
        //get all indexes of array
        var indexes = [];
        for (var i = 0; i < options.length; i++) {
          indexes.push(i);
        }
        // count duplicates of data clicked
        // //console.log(counts)

      data.forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
      });
      //console.log(counts)

      //assign random integer no larger than 5 digits to each array element
      // for (var i = 0; i < options.length; i++) {
      //   var random = Math.floor(Math.random() * 1000000);
      //   while (random > 100000) {
      //     random = Math.floor(Math.random() * 1000000);
      //     counts[i] = random;
      //   }
      // }
      // console.log(counts)

      console.log(Object.keys(options))
    },

      restoreUserAnswer: function () {
        let _items = this.model.get("_items"),
            imgLeft = $(".left-img"),
            imgRight = $(".right-img"),
            descLeft = $(".left-text"),
            descRight = $(".right-text"),
            outputScore = this.storeUserAnswer().userCounts;
            userPosition = this.storeUserAnswer().count;

        if (userPosition == _items.length) {
          this.model.set("_isComplete", true);
          // for (let key in userAnswers) {
          //   for (let key2 in userAnswers[key]) {
          //     //console.log(key2);
          //     userAnswers[key][key2] = 0;
          //   }
          // }
          data = []
          let overImg = "https://i.ibb.co/cbzXbpr/game-over.png";

          imgLeft.attr("src", overImg).css("border", "5px solid grey");
          imgRight.attr("src", overImg).css("border", "5px solid grey");

          descRight.text("No more scenarios left");
          descLeft.text("No more scenarios left");

        }
         else {
          outputScore
          console.log(outputScore)
          descLeft.text(_items[userPosition]["scenario-left"]["description"]);
          descRight.text(_items[userPosition]["scenario-left"]["description"]);
          imgLeft.attr("src", _items[userPosition]["scenario-left"]["_graphic"]);
          imgRight.attr("src", _items[userPosition]["scenario-right"]["_graphic"]);
          }
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
        let _items = this.model.get("_items");

        $submitBtn = $(
          ".moralMachine__inner > .btn__container > .btn__response-container > .btn__action"
        );
          $feedback = $(".moralMachine__feedback:not(.is-full-width)").css("width", "100%");
        ($inputs = $(".moralMachine__item-input")),
          ($labels = $(".moralMachine__item-label"));

        //CALC MOST KILLED & MOST SAVED WORK IN PROGRESS
        //   function KSShortener(side, value) {
        //     let length = _items[count][`scenario-${side}`][`${value} characters`].length;
        //     let arr = []
        //     for (let i = 0; i < length; i++) {
        //     let num = _items[count][`scenario-${side}`][`${value} characters`][i]['number'];
        //     let character = _items[count][`scenario-${side}`][`${value} characters`][i]['character'];
        //     arr.push({ [character] : num });
        //   }
        //     let sum = arr.reduce((acc, cur) => {
        //       for (let key in cur) {
        //         acc[key] = (acc[key] || 0) + cur[key];
        //       }
        //       return acc;
        //     }, {});
        //     let unique = Object.keys(sum).map(key => ({ [key]: sum[key] }));
        //     unique.sort((a, b) => Object.values(b)[0] - Object.values(a)[0])
        //     let final = unique.slice(0, 2)
        //     userAnswers["general-preference"]["Most Killed"] = Object.keys(final[0])[0]
        //     userAnswers["general-preference"]["Most saved"] = Object.keys(final[0])[0]
        //     //console.log(userAnswers)
        // }

        // KSShortener("left", "killed");
        // KSShortener("right", "killed");
        // KSShortener("left", "saved");
        // KSShortener("right", "saved");

        onItemSelect = function (event) {
          //console.log("onItemSelect");
        };

        data = flatten(data);

        function flatten(input) {
          return input.reduce((a, b) => a.concat(b), []);
        }

        function getScoreLeft(count) {
          let LLength = _items[count]["scenario-left"]["scoring"].length;
          for (let i = 0; i < LLength; i++) {
            return _items[count]["scenario-left"]["scoring"][i]["choices"];
          }
        }
        function getScoreRight(count) {
          let RLength = _items[count]["scenario-right"]["scoring"].length;
          for (let i = 0; i < RLength; i++) {
            return _items[count]["scenario-right"]["scoring"][i]["choices"];
          }
        }
        function pushData(choice) {
          let array = [].concat(choice);
          array.map((v) => {
            switch (v) {
              case "Save old": {
                userAnswers["age-preference"]["Save old"]++;
                break;
              }
              case "Save young": {
                userAnswers["age-preference"]["Save young"]++;
                break;
              }
              case "Save less people": {
                userAnswers["saving-more-lives"]["Save less people"]++;
                break;
              }
              case "Save more people": {
                userAnswers["saving-more-lives"]["Save more people"]++;
                break;
              }
              case "Men": {
                userAnswers["gender-preference"].Men++;
                break;
              }
              case "Woman": {
                userAnswers["gender-preference"].Woman++;
                break;
              }
              case "Save pedestrians": {
                userAnswers["protecting-passengers"]["Save pedestrians"]++;
                break;
              }
              case "Save people in car": {
                userAnswers["protecting-passengers"]["Save people in car"]++;
                break;
              }
              case "Save pedestrians": {
                userAnswers["species-preference"]["Save animals"]++;
                break;
              }
              case "Disobey Law": {
                userAnswers["upholding-the-law"]["Disobey Law"]++;
                break;
              }
              case "Uphold Law": {
                userAnswers["upholding-the-law"]["Uphold Law"]++;
                break;
              }
              case "authority": {
                userAnswers["social-value-preference"].authority++;
                break;
              }
              case "crime": {
                userAnswers["social-value-preference"].crime++;
                break;
              }
              case "Intervene": {
                userAnswers["avoiding-intervention"]["Intervene"]++;
                break;
              }
              case "Avoid Intervention": {
                userAnswers["avoiding-intervention"]["Avoid Intervention"]++;
                break;
              }
            }
          });
          newChoice();
          ++count;
          data.push(choice);
          data = flatten(data);
          //console.log(data);
          //console.log(count);
          data.forEach((x) => {
            counts[x] = (counts[x] || 0) + 1;
          });
          userCounts = Object.values(counts);
          
        }

        function newChoice(number = count + 1) {
          if (!(number > _items.length - 1)) {
            let imgLeft = this.$(".left-img");
            let imgRight = this.$(".right-img");
            let descLeft = this.$(".left-text");
            let descRight = this.$(".right-text");

            descRight.text(_items[count + 1]["scenario-right"]["description"]);
            descLeft.text(_items[count + 1]["scenario-left"]["description"]);

            imgLeft.attr("src", _items[count + 1]["scenario-left"]["_graphic"]);
            imgRight.attr(
              "src",
              _items[count + 1]["scenario-right"]["_graphic"]
            );
          } else {
            $(".moralMachine__button").hide();
            $(".moralMachine__item-option").hide();
            imgLeft = this.$(".left-img");
            imgRight = this.$(".right-img");
            descLeft = this.$(".left-text");
            descRight = this.$(".right-text");
            overImg = "https://i.ibb.co/cbzXbpr/game-over.png";

            imgLeft.attr("src", overImg).css("border", "5px solid grey");
            imgRight.attr("src", overImg).css("border", "5px solid grey");

            descRight.text("No more scenarios left");
            descLeft.text("No more scenarios left");
          }
        }
        function submitChoice() {
          $inputs.map((i, e) => {
            if (e != undefined)
              if (e.checked === true) {
                if (i === 0) {
                  pushData(getScoreLeft(count));
                } else pushData(getScoreRight(count));

                $submitBtn.prop("disabled", true);
                $labels
                  .filter('[data-adapt-index="' + i + '"]')
                  .toggleClass("is-selected", false);
                e.checked = false;
                Adapt.a11y.toggleEnabled($submitBtn, false);

                // Send event to mcqView.js to update inputs
                let eventBody = {};
                if (!(count > _items.length - 1)) eventBody.isEnabled = true;
                else eventBody.isEnabled = false;
                let resetInputs = new CustomEvent("reset-inputs", {
                  detail: eventBody,
                });
                document.dispatchEvent(resetInputs);
              }
          });
        }
        function updateInput() {
          for (let i = 0; i < $inputs.length; i++) {
            var input = $inputs.filter('[data-adapt-index="' + i + '"]');
            var label = $labels.filter('[data-adapt-index="' + i + '"]');
            input.toggleClass("is-disabled", false);
            label.toggleClass("is-disabled", false);

            if (input[0].checked) {
              //console.log(input[0].checked);
              label.toggleClass("is-selected", true);
            } else {
              label.toggleClass("is-selected", false);
            }
          }
        }
        $labels.on("click", () => {
          if (count <= _items.length - 1) $submitBtn.prop("disabled", false);
          setTimeout(() => {
            // Enable submit button
            if (count <= _items.length - 1) {
              Adapt.a11y.toggleEnabled($submitBtn, true);
              $submitBtn.text("SUBMIT BUTTON");
              updateInput();
            } else $submitBtn.hide() 
          }, 1);
        });
        $submitBtn.on("click", (e) => {
          submitChoice();
          setTimeout(() => {
            e.target.innerText = "SUBMIT BUTTON";
            if (count <= _items.length - 1) {
              this.attributes._isEnabled = true;
            } else {
              this.attributes._isEnabled = false;
              $submitBtn.hide() 
              // $(".btn__feedback:not(.is-full-width").css("width", "100% !important")
              for (let i = 0; i < $inputs.length; i++) {
                let $input = $inputs.filter('[data-adapt-index="' + i + '"]');
                let $label = $labels.filter('[data-adapt-index="' + i + '"]');
                $input.prop("disabled", true);
                $label.toggleClass("is-disabled", true);
              }
            }
          }, 1);
        });
        return userAnswers;
      },

      storeUserAnswer: function () {
        
        let answers;
        $submitBtn = $(
          ".moralMachine__inner > .btn__container > .btn__response-container > .btn__action"
        );
        $submitBtn.on("click", (e) => {
          answers = userCounts;
          final = this.model.set("_userAnswer", answers);
        });
        return { count, userCounts };
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

    model: Mcq.model.extend({}),
  });
});
