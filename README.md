# Moral Machine Comopnent

The Moral Machine Component is a question component built for the [Adapt framework](https://github.com/adaptlearning/adapt_framework). This component extends the [MCQ component](https://github.com/adaptlearning/adapt-contrib-mcq) and includes some of the functionalities found in the [GMCQ component](https://github.com/adaptlearning/adapt-contrib-gmcq).

This component is based on MIT's [Moral Machine](https://www.moralmachine.net/) game. This game looks at moral choices that driverless cars will be forced make. In this game, you will have to decide what the driverless will do.

The game presents the user with a set of scenerios. In both cases there will be fatalities. The user must decide who the victims are.

To play the game, the user must click either one of the two images and then submit their decision by clicking the submit button.

## Installation

[Click here](https://github.com/jschof1/moralMachine/archive/refs/heads/master.zip) to download the folder which you will be importing. Once this has been downloaded you can either: 

##### Install the plugin via your Adapt Authoring tool

Click on the top left hand corner drop-down and select *Plugin Management*. Then click the *Upload Plugin* button. Now, drop the zip file you just donwloaded from the link above and drop it onto the *Choose file* button.

<video width="320" height="240" controls>
  <source src="https://streamable.com/e/ylc1ua" type="video/mp4">
</video>


##### Install the plugin via your OS's file manager

Unzip the downloaded file. Then, in your course folder navigate to the componets folder and drag the the unzipped folder into it.


## Settings overview

Each component should come with an example.json which contains an example of the data structure needed for this component to work. This enables developers to copy this over without the need for an editor.

Developers should give some description for data expected for their component and what the setting does. The example.json file for a basic component would contain at least the following:

```
{
   "_id":"c-05",
   "_parentId":"b-05",
   "_type":"component",
   "_component":"blank",
   "_classes":"",
   "_isOptional":true,
   "_items":[
      {
         "id":"122352322342",
         "scenario-left":{
            "_graphic":"course/en/assets/scenarios/1-l.png",
            "_shouldBeSelected":false,
            "description":"Drive through a pedestrian crossing ahead. This will result in killing one male adult and saving one male adult",
            "direction":"go straight",
            "saved characters":[
               {
                  "character":"Male (adult)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (adult)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":[
                     "Save people in car",
                     "Intervene"
                  ]
               }
            ]
         },
         "scenario-right":{
            "_graphic":"course/en/assets/scenarios/1-r.png",
            "_shouldBeSelected":false,
            "description":"Swerve and crash into a concrete barrier. This will result in killing one male adult and saving one male adult",
            "direction":"swerve",
            "saved characters":[
               {
                  "character":"Male (adult)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (adult)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":[
                     "Save pedestrians",
                     "Avoid Intervention"
                  ]
               }
            ]
         }
      },
      {
         "id":"323423",
         "scenario-left":{
            "_graphic":"course/en/assets/scenarios/2-l.png",
            "_shouldBeSelected":false,
            "description":"Kill one female adult and child and a male adult. Save a female (professional)",
            "direction":"go straight",
            "saved characters":[
               {
                  "character":"Female (professional e.g. doctor)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Female (adult)",
                  "number":1
               },
               {
                  "character":"Male (adult)",
                  "number":1
               },
               {
                  "character":"Female (child)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Avoid Intervention"
               },
               {
                  "choices":"Save professionals"
               }
            ]
         },
         "scenario-right":{
            "_graphic":"course/en/assets/scenarios/2-r.png",
            "_shouldBeSelected":false,
            "description":"Save one female adult and child and a male. Save a female (professional)",
            "direction":"swerve",
            "saved characters":[
               {
                  "character":"Baby",
                  "number":1
               },
               {
                  "character":"Male (adult)",
                  "number":1
               },
               {
                  "character":"Female (adult)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Female (professional e.g. doctor)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save more people"
               },
               {
                  "choices":"Save young"
               },
               {
                  "choices":"Save people in car"
               }
            ]
         }
      },
      {
         "id":"122352322342",
         "scenario-left":{
            "_graphic":"course/en/assets/scenarios/3-l.png",
            "_shouldBeSelected":false,
            "description":"Drive through a pedestrian crossing ahead will result in killing, one male, one female adult and one male child but saving one female (professional)",
            "direction":"go straight",
            "saved characters":[
               {
                  "character":"Female",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Female (professional)",
                  "number":1
               },
               {
                  "character":"Male (child)",
                  "number":1
               },
               {
                  "character":"Male (man)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save people in car"
               },
               {
                  "choices":"Save old"
               },
               {
                  "choices":"Avoid intervention"
               }
            ]
         },
         "scenario-right":{
            "_graphic":"course/en/assets/scenarios/3-r.png",
            "_shouldBeSelected":false,
            "description":"Swerving and crashing into the concrete barrier will result in killing a female (professional) and killing one male adult, male child and female adult",
            "direction":"swerve",
            "saved characters":[
               {
                  "character":"Male (adult)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (adult)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save young"
               },
               {
                  "choices":"Save more lives"
               }
            ]
         }
      },
      {
         "id":"323423",
         "scenario-left":{
            "_graphic":"course/en/assets/scenarios/4-l.png",
            "_shouldBeSelected":false,
            "description":"Drive straight to kill a female and male jogger (adult) but save the elderly male and female",
            "direction":"go straight",
            "saved characters":[
               {
                  "character":"Male (old)",
                  "number":1
               },
               {
                  "character":"Female (old)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (jogger)",
                  "number":1
               },
               {
                  "character":"Female (jogger)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save old"
               },
               {
                  "choices":"Avoid Intervention"
               }
            ]
         },
         "scenario-right":{
            "_graphic":"course/en/assets/scenarios/4-r.png",
            "_shouldBeSelected":false,
            "description":"Swerve to kill and elderly male and female and save a male and a female jogger.",
            "direction":"swerve",
            "saved characters":[
               {
                  "character":"Male (jogger)",
                  "number":1
               },
               {
                  "character":"Female (jogger)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (old)",
                  "number":1
               },
               {
                  "character":"Female (old)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Avoid Intervention"
               }
            ]
         }
      },
      {
         "id":"122352322342",
         "scenario-left":{
            "_graphic":"course/en/assets/scenarios/5-l.png",
            "_shouldBeSelected":false,
            "description":"Going straight will result in the death of one female child and a cat but saving an elderly male and female:",
            "direction":"go straight",
            "saved characters":[
               {
                  "character":"Male (old)",
                  "number":1
               },
               {
                  "character":"female (old)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Female (child)",
                  "number":1
               },
               {
                  "character":"Pet (cat)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save old"
               },
               {
                  "choices":"Avoid Intervention"
               },
               {
                  "choices":"Save humans"
               }
            ]
         },
         "scenario-right":{
            "_graphic":"course/en/assets/scenarios/5-r.png",
            "_shouldBeSelected":false,
            "description":"This will result in saving one female child and cat but killing an elderly male and female",
            "direction":"swerve",
            "saved characters":[
               {
                  "character":"Female (child)",
                  "number":1
               },
               {
                  "character":"Male (child)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (old)",
                  "number":1
               },
               {
                  "character":"Female (old)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save young"
               },
               {
                  "choices":"Save pets"
               }
            ]
         }
      },
      {
         "id":"323423",
         "scenario-left":{
            "_graphic":"course/en/assets/scenarios/6-l.png",
            "_shouldBeSelected":false,
            "description":"Direct the autonomous car to do nothing, killing a robber and a young girl",
            "direction":"go straight",
            "saved characters":[
               {
                  "character":"Male (professional e.g. doctor)",
                  "number":1
               },
               {
                  "character":"Female (old)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (Robber)",
                  "number":1
               },
               {
                  "character":"Female (child)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Avoid Intervention"
               },
               {
                  "choices":"Save professionals"
               },
               {
                  "choices":"Save old"
               },
               {
                  "choices":"Uphold Law"
               }
            ]
         },
         "scenario-right":{
            "_graphic":"course/en/assets/scenarios/6-r.png",
            "_shouldBeSelected":false,
            "description":"Make the car swerve, killing a male doctor and elderly woman.",
            "direction":"swerve",
            "saved characters":[
               {
                  "character":"Male (Robber)",
                  "number":1
               },
               {
                  "character":"Female (child)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (professional e.g. doctor)",
                  "number":1
               },
               {
                  "character":"Female (old)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save young"
               },
               {
                  "choices":""
               }
            ]
         }
      },
      {
         "id":"122352322342",
         "scenario-left":{
            "_graphic":"course/en/assets/scenarios/7-l.png",
            "_shouldBeSelected":false,
            "description":"Drive through a pedestrian crossing ahead. This will result in:",
            "direction":"go straight",
            "saved characters":[
               {
                  "character":"Female (professional e.g. doctor)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (professional e.g. doctor)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save female"
               },
               {
                  "choices":"Avoid Intervention"
               }
            ]
         },
         "scenario-right":{
            "_graphic":"course/en/assets/scenarios/7-r.png",
            "_shouldBeSelected":false,
            "description":"Swerve and crash into a concrete barrier. This will result in",
            "direction":"swerve",
            "saved characters":[
               {
                  "character":"Female (professional e.g. doctor)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Female (professional e.g. doctor)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save male"
               }
            ]
         }
      },
      {
         "id":"323423",
         "scenario-left":{
            "_graphic":"course/en/assets/scenarios/8-l.png",
            "_shouldBeSelected":false,
            "description":"3 Click on either picture to submit your choice.",
            "direction":"go straight",
            "saved characters":[
               {
                  "character":"Male (professional e.g. doctor)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (Robber)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Avoid Intervention"
               },
               {
                  "choices":"Save professionals"
               },
               {
                  "choices":"Uphold law"
               },
               {
                  "choices":"Save people in car"
               }
            ]
         },
         "scenario-right":{
            "_graphic":"course/en/assets/scenarios/8-r.png",
            "_shouldBeSelected":false,
            "description":"4 Click on either picture to submit your choice.",
            "direction":"swerve",
            "saved characters":[
               {
                  "character":"Male (Robber)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (professional e.g. doctor)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save more people"
               },
               {
                  "choices":"Save young"
               }
            ]
         }
      },
      {
         "id":"122352322342",
         "scenario-left":{
            "_graphic":"course/en/assets/scenarios/9-l.png",
            "_shouldBeSelected":false,
            "description":"Drive through a pedestrian crossing ahead. This will result in:",
            "direction":"go straight",
            "saved characters":[
               {
                  "character":"Male (Robber)",
                  "number":1
               },
               {
                  "character":"Pet (dog)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (Robber)",
                  "number":1
               },
               {
                  "character":"Pet (dog)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save more people"
               },
               {
                  "choices":"Avoid Intervention"
               },
               {
                  "choices":"Save Humans"
               }
            ]
         },
         "scenario-right":{
            "_graphic":"course/en/assets/scenarios/9-r.png",
            "_shouldBeSelected":false,
            "description":"Swerve and crash into a concrete barrier. This will result in",
            "direction":"swerve",
            "saved characters":[
               {
                  "character":"Female (professional e.g. doctor))",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Male (Robber)",
                  "number":1
               },
               {
                  "character":"Pet (dog)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Uphold Law"
               },
               {
                  "choices":"Save Pets"
               }
            ]
         }
      },
      {
         "id":"323423",
         "scenario-left":{
            "_graphic":"course/en/assets/scenarios/10-l.png",
            "_shouldBeSelected":false,
            "description":"3 Click on either picture to submit your choice.",
            "direction":"go straight",
            "saved characters":[
               {
                  "character":"Female (professional e.g. doctor)",
                  "number":1
               },
               {
                  "character":"Male (professional e.g. doctor)",
                  "number":1
               },
               {
                  "character":"Female (pregnant)",
                  "number":1
               },
               {
                  "character":"Female (old)",
                  "number":1
               },
               {
                  "character":"Male (old)",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Female (adult)",
                  "number":1
               },
               {
                  "character":"Male (adult)",
                  "number":1
               },
               {
                  "character":"Female (child)",
                  "number":1
               },
               {
                  "character":"Male (child)",
                  "number":1
               },
               {
                  "character":"Baby",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Avoid Intervention"
               },
               {
                  "choices":"Save old"
               }
            ]
         },
         "scenario-right":{
            "_graphic":"course/en/assets/scenarios/10-r.png",
            "_shouldBeSelected":false,
            "description":"4 Click on either picture to submit your choice.",
            "direction":"swerve",
            "saved characters":[
               {
                  "character":"Female (adult)",
                  "number":1
               },
               {
                  "character":"Male (adult)",
                  "number":1
               },
               {
                  "character":"Female (child)",
                  "number":1
               },
               {
                  "character":"Male (child)",
                  "number":1
               },
               {
                  "character":"Baby",
                  "number":1
               }
            ],
            "killed characters":[
               {
                  "character":"Female (professional e.g. doctor)",
                  "number":1
               },
               {
                  "character":"Male (professional e.g. doctor)",
                  "number":1
               },
               {
                  "character":"Female (pregnant)",
                  "number":1
               },
               {
                  "character":"Female (old)",
                  "number":1
               },
               {
                  "character":"Male (old)",
                  "number":1
               }
            ],
            "scoring":[
               {
                  "choices":"Save more people"
               },
               {
                  "choices":"Save young"
               }
            ]
         }
      }
   ]
}
```
A description of the core settings can be found at: [Core model attributes](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes)


### Data description

 `_graphic` displays what characters will be shown in the scenario.
 
 `_description` is where you describe the concequences of the action.
 
 `direction` allows you to choose whether the driverless car decides to go straight or swerve.
 
 `saved characters` inputs what characters are saved.
 
 `killed charecters` inputs what characters are killed.
 
 `scoring` outputs the users final choices.
 
