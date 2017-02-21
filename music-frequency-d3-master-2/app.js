$(document).ready(function () {
    
    var color;
    var resultElement = document.getElementById('result'),
	sliders = document.getElementsByClassName('sliders');

for ( var i = 0; i < sliders.length; i++ ) {

	noUiSlider.create(sliders[i], {
		start: 127,
		connect: [true, false],
		orientation: "vertical",
		range: {
			'min': 0,
			'max': 255
		},
		format: wNumb({
			decimals: 0
		})
	});

	// Bind the color changing function
	// to the slide event.
    
	sliders[i].noUiSlider.on('slide', setColor);

}


    var temp_freq = [];
    var max = 0, tracker = 0,temp_max, opacity = 1;
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
    audioElement.crossOrigin = "anonymous";
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  var frequencyData = new Uint8Array(64);

  var svgHeight = '200';
  var svgWidth = '1200';
  var barPadding = '3';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  // Create our initial D3 chart.
  svg.selectAll('rect')
     .data(frequencyData)
     .enter()
     .append('rect')
     .attr('x', function (d, i) {
        return i * (svgWidth / frequencyData.length);
     })
     .attr('width', svgWidth / frequencyData.length - barPadding);

    function showValue(newValue, id)
    {
        document.getElementById("rCurr").innerHTML = newValue;
    }
    
    
    function setColor(){
        console.log("sliding");
	// Get the slider values,
	// stick them together.
	 color = 'rgba(' +
		sliders[0].noUiSlider.get() + ',' +
		sliders[1].noUiSlider.get() + ',' +
		sliders[2].noUiSlider.get() + ',';
         
        console.log("color val: " + color);

	// Fill the color box.
	
}
    
  // Continuously loop and update chart with frequency data.
  function renderChart() {
    requestAnimationFrame(renderChart);
    
     // Copy frequency data to frequencyData array.
     analyser.getByteFrequencyData(frequencyData);
     
      var avg = 0;
      for(var i = 0; i < frequencyData.length; i++)
          {
              avg = avg + frequencyData[i];
              //console.log(avg);
          }
      avg = avg/frequencyData.length-1;
      opacity = (avg - 50) / (255-80);
     
      if(opacity<0)
          {
              opacity = .0;
          }
      /*
      console.log(frequencyData[46]);
      
      if(frequencyData[46] >250)
          {
              opacity =1.0;
          }
      else if(frequencyData[46] >225)
          {
              opacity = 0.95;
          }
      else if(frequencyData[46] > 200)
          {
              opacity = 0.90;
          }
      else if(frequencyData[46] > 175)
          {
              opacity = .85;
          }
      else if(frequencyData[46] >150)
          {
              opacity = 0.80;
          }
      else if(frequencyData[46] > 125)
          {
              opacity = 0.75;
          }
      else if(frequencyData[46] > 100)
          {
              opacity = .70;
          }  
      else if(frequencyData[46] >75)
          {
              opacity = 0.65;
          }
      else if(frequencyData[46] > 50)
          {
              opacity = 0.60;
          }
      else{
          opacity = .2;
      }
      
      /*
      else if(frequencyData[46] > 160)
          {
              opacity = .55;
          }else if(frequencyData[46] >150)
          {
              opacity = 0.50;
          }
      else if(frequencyData[46] > 140)
          {
              opacity = 0.45;
          }
      else if(frequencyData[46] > 130)
          {
              opacity = .40;
          } 
      else if(frequencyData[46] > 120)
          {
              opacity = 0.35;
          }
      else if(frequencyData[46] > 110)
          {
              opacity = .30;
          }  
      else if(frequencyData[46] >100)
          {
              opacity = 0.25;
          }
      else if(frequencyData[46] > 90)
          {
              opacity = 0.30;
          }
      else if(frequencyData[46] > 80)
          {
              opacity = .28;
          }else if(frequencyData[46] >70)
          {
              opacity = 0.26;
          }
      else if(frequencyData[46] > 60)
          {
              opacity = 0.24;
          }
      else if(frequencyData[46] > 50)
          {
              opacity = .22;
          }
      else{
          opacity = .2;
      }
      
      
      */
      
      
      
      
      
      
      //document.body.style.backgroundColor = 'rgba:( 0, 0, 0' + opacity +')';
      document.body.style.background = color + opacity +')' ;//"rgba(28,107,160," + opacity +")";//
      
      
      
      
      
      
      
      //console.log(frequencyData);
     // Update d3 chart with new data.
      /*
     svg.selectAll('rect')
        .data(frequencyData)
        .attr('y', function(d) {
           return svgHeight - d;
        })
        .attr('height', function(d) {
           return d;
        })
        .attr('fill', function(d) {
         //console.log(d);
            return 'rgba(0, 0, 0,'+ opacity+')'; //+ d + ')';
        // return 'rgba(0, 0, 0,1)'; //+ d + ')';
        
         
        }); */
  }
//audioElement.play();
  // Run the loop
  renderChart();

});
