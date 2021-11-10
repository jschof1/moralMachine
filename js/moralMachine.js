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

  // let dayData = {
  //   ...userAnswers
  // }

  let count = 0;

  let data = [];

  let userCounts = {};

  let options = {
    "Avoid Intervention": 38780,
    "Save people in car": 98202,
    "Save old": 89237,
    "Save young": 42374,
    "Save more people": 19273,
    "Save humans": 50283,
    "Save pets": 33495,
    "Save professionals": 77231,
    "Save robbers": 66842,
    "Uphold law": 12079,
  };
  let counts = {};
  let newOptions;

  console.log(Object.keys(counts));

  setTimeout(() => {
    console.log(
      "THIS STATES THE USERS DECISIONS SO FAR:",
      counts,
      data
      // "THIS STATES WHAT SCENARIO THE USER IS ON:",
      // count,
      // "THIS STATES WHAT THE USERS CHOICES WITHOUT THE NUMBERS",
      // data,
      // "THIS IS THE STORAGE COMPATIBLE VERSION - PLEASE SEE OPTIONS TO FIND ASSIGNED ID",
      // newOptions,
      // 'CHECK IF STATE CHANGES',
      // userAnswers,
      // 'COUNTS FOR THE DAY',
      // dayData
    );
  }, 5000);

//console.log(dayData)
  let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
          if (req.readyState == XMLHttpRequest.DONE) {
            //console.log(req.responseText);
          }
        };
  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      //console.log(req.responseText);
    }
  };
  req.open("PUT", "https://api.jsonbin.io/v3/b/616d96659548541c29c4ef3a", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2b$10$5ztXybl/2Pyv29l65GVIwu/qowvI/dmRTjUvWR6sxkeBmj5IOGGhi");

      setTimeout(() => { req.send(JSON.stringify(userAnswers))}, 5000)
  var moralMachine = Mcq.view.extend(
    {
      onQuestionRendered: function () {
        Mcq.view.prototype.setupQuestion.call(this);
        this.storeCollectiveData();
        this.restoreUserAnswer();
        // this.apiUpdate();
        this.resizeImage(Adapt.device.screenSize);
        this.setUpColumns();
        this.$(".js-item-label").imageready(this.setReadyStatus.bind(this));
        // Disable submit button on load
        var $buttonsAction = this.$(".js-btn-action");
        Adapt.a11y.toggleEnabled($buttonsAction, false);
      },

      restoreUserAnswer: function () {
        
        let _items = this.model.get("_items")

        let imgLeft = this.$(".left-img");
        let imgRight = this.$(".right-img");
        let descLeft = this.$(".left-text");
        let descRight = this.$(".right-text");

        // this.storeUserAnswer();
        if (count >= _items.length) {
          this.model.set("_isComplete", true);
          data = [];
          count = 0;

          $("button").hide();
          $(".moralMachine__item-option").hide();

          overImg = "https://i.ibb.co/tMFWfvq/choices-made.png";

          imgLeft.attr("src", overImg).css("border", "5px solid grey");
          imgRight.attr("src", overImg).css("border", "5px solid grey");

          descRight.text("Decision(s) made");
          descLeft.text("Decisions(s) made");
        } else {
          userCounts;
          descLeft.text(_items[count]["scenario-left"]["description"]);
          descRight.text(_items[count]["scenario-left"]["description"]);
          imgLeft.attr("src", _items[count]["scenario-left"]["_graphic"]);
          imgRight.attr("src", _items[count]["scenario-right"]["_graphic"]);
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
        //console.log('coshema');
        $submitBtn = $(
          ".moralMachine__inner > .btn__container > .btn__response-container > .btn__action"
        );
        $feedback = $(".moralMachine__feedback:not(.is-full-width)").css(
          "width",
          "100%"
        );
        ($inputs = $(".moralMachine__item-input")),
          ($labels = $(".moralMachine__item-label"));

        // CALC MOST KILLED & MOST SAVED WORK IN PROGRESS
        // function KSShortener(side, value) {
        //   let length =
        //     _items[count][`scenario-${side}`][`${value} characters`].length;
        //   let arr = [];
        //   for (let i = 0; i < length; i++) {
        //     let num =
        //       _items[count][`scenario-${side}`][`${value} characters`][i][
        //         "number"
        //       ];
        //     let character =
        //       _items[count][`scenario-${side}`][`${value} characters`][i][
        //         "character"
        //       ];
        //     arr.push({ [character]: num });
        //   }
        //   //console.log(arr)
        //   let sum = arr.reduce((acc, cur) => {
        //     for (let key in cur) {
        //       acc[key] = (acc[key] || 0) + cur[key];
        //     }
        //     return acc;
        //   }, {});
        //   //console.log(sum);

        //   let unique = Object.keys(sum).map((key) => ({ [key]: sum[key] }));
        //   unique.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
        //   let final = unique.slice(0, 2);
        //   userAnswers["general-preference"]["Most Killed"] = Object.keys(
        //     final[0]
        //   )[0];
        //   userAnswers["general-preference"]["Most saved"] = Object.keys(
        //     final[0]
        //   )[0];
        //  //console.log(final)
        // }

        // KSShortener("left", "killed");
        // KSShortener("right", "killed");
        // KSShortener("left", "saved");
        // KSShortener("right", "saved");

        onItemSelect = function (event) {
          ////console.log("onItemSelect");
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
          console.log(data);
          console.log(counts);
          data.forEach((x) => {
            counts[x] = (counts[x] || 0) + 1;
          });

          let 
            keys = Object.keys(options),
            countsKeys = Object.keys(counts),
            values = Object.values(options);
          // if the keys match, create a new object with options value as key and count value as value
          newOptions = keys.map((key, i) => {
            if (countsKeys.includes(key)) {
              //replace the countsKeys with optionsValues
              return { [values[i]]: counts[key] };
            } else {
              return { [values[i]]: 0 };
            }
          });
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
              ////console.log(input[0].checked);
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
            } else $submitBtn.hide();
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
              $submitBtn.hide();
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
        // update window.localStorage with userAnswers
        setTimeout(() => {
          console.log(
            "THIS STATES THE USERS DECISIONS SO FAR:",
            counts,
            // storage.getItem(counts)
          );
        }, 5000);
        
        let items = this.model.get('_items')

        //collect max score length for each sde 
        
       let gameLength = items.length
           

       console.log(count)
        

        storage = window.localStorage
        $submitBtn.on("click", (e) => {

          // let arr = []
          // arr.push(counts, count)
          // console.log(arr)
              if (count == items.length){
                storage.setItem("ANSWERS", JSON.stringify(counts))
                storage.setItem("count", JSON.stringify(count))
                storage.setItem("amountEnd", JSON.stringify(gameLength))
                    // console.log(count)
                    // console.log(storage)
                    // console.log(storage.getItem("ANSWERS"))
                    // console.log(storage.getItem("amount"))
              }
              else {
                window.localStorage.clear();
              }
        });
        return userAnswers;
      },

      
      // apiUpdate: function() {
      //   let _items = this.model.get("_items")
      //   //console.log(_items.length)
      //   let req = new XMLHttpRequest();
      //   req.onreadystatechange = () => {
      //     if (req.readyState == XMLHttpRequest.DONE) {
      //       //console.log(req.responseText);
      //     }
      //   };
      //   let finishCount = 0
      //   let $submitBtn = $(
      //     ".moralMachine__inner > .btn__container > .btn__response-container > .btn__action"
      //   );
      //   $submitBtn.on("click", (e) => {
      //     ++finishCount;
      //     //console.log(finishCount)
      //   })
      //     if (finishCount == _items.length){
      //   req.open("PUT", "https://api.jsonbin.io/v3/b/616d96659548541c29c4ef3a", true);
      //   req.setRequestHeader("Content-Type", "application/json");
      //   req.setRequestHeader("X-Master-Key", "$2b$10$5ztXybl/2Pyv29l65GVIwu/qowvI/dmRTjUvWR6sxkeBmj5IOGGhi");
      //   setTimeout(() => { req.send(JSON.stringify(userAnswers))}, 5000)
      //     }
      // },
      storeUserAnswer: function () {
        let output;
        let answers;
        let final;

        let values;
        let keys;
        let conversion = [];
        $submitBtn = $(
          ".moralMachine__inner > .btn__container > .btn__response-container > .btn__action"
        );
        $submitBtn.on("click", (e) => {
          answers = newOptions;
          for (let i of Object.keys(newOptions)) {
            values = Object.values(answers[i]);
            keys = Object.keys(answers[i]);
            output = [parseInt(...keys), ...values];
            conversion.push(...output);
          }
          final = this.model.set("_userAnswer", conversion);
        });
        return final;
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
