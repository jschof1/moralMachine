define([
  'core/js/adapt',
  'components/adapt-contrib-mcq/js/adapt-contrib-mcq'
], function(Adapt, Mcq) {

  var moralMachine = Mcq.view.extend({

    onQuestionRendered: function() {
      this.getAssets();
      this.resizeImage(Adapt.device.screenSize);
      this.setUpColumns();
      this.$('.js-item-label').imageready(this.setReadyStatus.bind(this));
    },

  getAssets : function() {
    let _items = this.model.get('_items');
   
    //left side
    var graphicLeft = _items[0]["scenario-left"]["_graphic"]
    //right side
    var graphicRight = _items[0]["scenario-right"]["_graphic"];
    
    //dom elements
    let leftImgEl = this.$(".left-img"); 
    let rightImgEl = this.$(".right-img");
    let desc = this.$("moralMachine__attribution")

    //setting first 
    leftImgEl.attr("src", graphicLeft);
    rightImgEl.attr("src", graphicRight);

    let i = 0
    let j = 0
    let k = 0
    let l = 0

    if (i < _items.length) {
      $('.btn-text').on("click", function () {
        console.log('clicked')
        
        desc.text(_items[i++]["scenario-left"]["description"]);
        leftImgEl.attr("src", _items[++j]["scenario-left"]["_graphic"]);
        rightImgEl.attr("src", _items[++k]["scenario-right"]["_graphic"]);

        leftImgEl.attr("_items", ++l)
        rightImgEl.attr("_items", ++l)

      });
    } if (i == _items.length) {
      return console.log("done");
    }
  },

    onDeviceResize: function() {
      this.setUpColumns();
    },

    resizeImage: function(width) {
      var imageWidth = width === 'medium' ? 'small' : width;

      this.$('.js-item-label').each(function(index) {
        var $img = $(this).find('img');
        var newSrc = $img.attr('data-' + imageWidth);
        if (!newSrc) return;
        $img.attr('src', newSrc);
      });

    },

    setUpColumns: function() {
      var columns = 2

      var isLarge = Adapt.device.screenSize === 'large';

      this.$el.toggleClass('has-column-layout', isLarge);
      this.$('.js-moralMachine-item').css('width', isLarge ? (100 / columns) + '%' : '');
    }

  }, {
    template: 'moralMachine'
  });

  return Adapt.register('moralMachine', {
    view: moralMachine,
    model: Mcq.model.extend({})
  });

});
