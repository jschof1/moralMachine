define([
  'core/js/adapt',
  './moralMachineView',
  './moralMachineModel'
], function(Adapt, MoralMachineView, MoralMachineModel) {


  return Adapt.register('moralMachine', {
    model: MoralMachineModel,
    view: MoralMachineView
  });

});