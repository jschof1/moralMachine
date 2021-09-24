# Moral Machine Comopnent

The Moral Machine Component is a question component built for the [Adapt framework](https://github.com/adaptlearning/adapt_framework). This component extends the [MCQ component](https://github.com/adaptlearning/adapt-contrib-mcq) and includes some of the functionalities found in the [GMCQ component](https://github.com/adaptlearning/adapt-contrib-gmcq).

This component is based on MIT's [Moral Machine](https://www.moralmachine.net/) game. This game looks at moral choices that driverless cars will be forced make. In this game, you will decide what the driverless will do.

The game presents the user with a set of scenerios. Each scenario contains a dilemma forcing you to choose what the self-driving car decides to do. In both cases there will be fatalities. You must decide who the victims are.


## Installation

[Click here](https://github.com/jschof1/moralMachine/archive/refs/heads/master.zip) to download the folder which you will be importing. Once this has been downloaded you can either: 

##### Install the plugin via your Adapt Authoring tool

Click on the top left hand corner drop-down and select *Plugin Management*. Then click the *Upload Plugin* button. Now, drap the zip file you just donwloaded from the link above and drop it onto the *Choose file* button.

[Via the authoring tool:](media/16324746763004/guide-in-authoring-tool_ycctoi7k_xZLs.mp4)

##### Install the plugin via your OS's file manager

Unzip the downloaded file. Then, in your course folder navigate to the componets folder and drag the the unzipped folder into it.

## Usage

Some details of how the plug-in might be used should be given here.


## Settings overview

Each component should come with an example.json which contains an example of the data structure needed for this component to work. This enables developers to copy this over without the need for an editor.

Developers should give some description for data expected for their component and what the setting does. The example.json file for a basic component would contain at least the following:

```
{
 {
        "_id": "c-05",
        "_parentId": "b-05",
        "_type": "component",
        "_component": "blank",
        "_classes": "",
        "_isOptional": true,
        "_items": [
            {
              "id": "",
              "scenario-left": {
                "_graphic": "course/en/assets/2e77ca6a4e762df2f96d7da5a821835a36622bc6.png",
                "description": "Click on either picture to submit your choice.",
                "direction": [
                  {
                    "Direction type": "go straight"
                  }
                ],
                "saved characters": [
                  {
                    "character": "Female (child)",
                    "number": 3
                  }
                ],
                "killed characters": [
                  {
                    "character": "Male (adult)",
                    "number": 1
                  }
                ],
                "scoring": [
                  {
                    "choices": "Save more people"
                  }
                ]
              },
              "scenario-right": {
                "_graphic": "course/en/assets/b1a88a618ba35849b6b9d5b2e27882bfccde5b15.png",
                "description": "Click on either picture to submit your choice.",
                "direction": [
                  {
                    "Direction type": "swerve"
                  }
                ],
                "saved characters": [
                  {
                    "character": "Female (professional e.g. doctor)",
                    "number": 1
                  }
                ],
                "killed characters": [
                  {
                    "character": "Robber",
                    "number": 1
                  }
                ],
                "scoring": [
                  {
                    "choices": "Save robbers"
                  }
                ]
              }
            }
        ]}
}
```
A description of the core settings can be found at: [Core model attributes](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes)


### Data description

 `_graphic` displays what characters will be shown in the scenario
 `_description` is where you describe the concequences of the action
 `direction` allows you to choose whether the driverless car decides to go straight or swerve
 `saved characters` inputs what characters are saved
 `killed charecters` inputs what characters are killed 
 `scoring` outputs the users final choices