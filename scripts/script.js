  //Set dimensions
  var m = {top: 50, right: 50, bottom: 50, left: 50}
  , h = 500 - m.top - m.bottom
  , w = 960 - m.left - m.right
  , numBins = 50
  , n = 10000;

//Generate random numbers
var data = d3.json('data/data.json');
// var norm = d3.range(n).map(d3.random.normal(0, 1));
// var x = d3.scale.linear().domain([-3, 3]).range([0, w]);
// var data = d3.layout.histogram().bins(x.ticks(numBins))(norm);


//Calculative cdf
// var last = 0;
// for(var i=0; i < data.length; i++){
//   data[i]['cum'] = last + data[i].y;
//   last = data[i]['cum'];
//   data[i]['cum'] = data[i]['cum']/n;
// }

//Axes and scales
var yhist = d3.scaleLinear()
                .domain([0, d3.max(data.caratWeight, function(d) { return d.y; })])
                .range([h, 0]);

// var ycum = d3.scale.linear().domain([0, 1]).range([h, 0]);

var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom');

var yAxis = d3.svg.axis()
              .scale(yhist)
              .orient('left');

var yAxis2 = d3.svg.axis()
               .scale(ycum)
               .orient('right');

//Draw svg
var svg = d3.select("body").append("svg")
            .attr("width", w + m.left + m.right)
            .attr("height", h + m.top + m.bottom)
            .append("g")
            .attr("transform", "translate(" + m.left + "," + m.top + ")");

//Draw histogram
var bar = svg.selectAll(".bar")
              .data(data.caratWeight)
              .enter().append("g")
              .attr("class", "bar")
              .attr("transform", function(d) { return "translate(" + x(d.x) + "," + yhist(d.y) + ")"; });

bar.append("rect")
    .attr("x", 1)
    .attr("width", w/numBins/1.3)
    .attr("height", function(d) { return h - yhist(d.y); });

//Draw CDF line
// var guide = d3.svg.line()
//               .x(function(d){ return x(d.x) })
//               .y(function(d){ return ycum(d.cum) })
//               .interpolate('basis');

// var line = svg.append('path')
//               .datum(data)
//               .attr('d', guide)
//               .attr('class', 'line');

//Draw axes
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Count (Histogram)");

// svg.append("g")
//     .attr("class", "y axis")
//     .attr("transform", "translate(" + [w, 0] + ")")
//     .call(yAxis2)
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 4)
//     .attr("dy", "-.71em")
//     .style("text-anchor", "end")
//     .text("CDF");