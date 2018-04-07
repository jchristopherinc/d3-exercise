var data = [
    [ 400, 200 ],
    [ 210,140 ],
    [ 722,300 ],
    [ 70,160 ],
    [ 250,50 ],
    [ 110,280 ],
    [ 699,225 ],
    [ 90, 220 ]
];
var chart_width = 800;
var chart_height = 400;
var padding = 50;

//create SVG element
var svg = d3.select('#chart')
      .append('svg')
      .attr('height', chart_height)
      .attr('width', chart_width);

//create scales
var x_scale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
          return d[0];
        })])
        .range([padding, chart_width - padding * 2]);

var y_scale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
          return d[1];
        })])
        .range([chart_height - padding, padding]);

var x_axis = d3.axisBottom(x_scale);

var y_axis = d3.axisLeft(y_scale)
            .ticks(5);

// clip path
svg.append('clipPath')
   .attr('id', 'plot-area-clip-path')
   .append('rect')
   .attr('x', padding)
   .attr('y', padding)
   .attr('width', chart_width - padding * 3)
   .attr('height', chart_height - padding * 2);

svg.append('g')
   .attr('class', 'x-axis')
   .attr(
     'transform',
     'translate(0, ' + (chart_height - padding)+ ')'
   )
   .call(x_axis);

svg.append('g')
  .attr('class', 'y-axis')
  .attr(
    'transform',
    'translate(' + padding+ ', 0)'
  )
  .call(y_axis);

//create circles
svg.append('g')
   .attr('id', 'plot-area')
   .attr('clip-path', 'url(#plot-area-clip-path)')
   .selectAll('circle')
   .data(data)
   .enter()
   .append('circle')
   .attr('cx', function(d) {
     return x_scale(d[0]);
   })
   .attr('cy', function(d) {
     return y_scale(d[1]);
   })
   .attr('r', 15)
   // .attr('r', function(d) {
   //   return a_scale(d[1]);
   // })
   .attr('fill', '#D1AB0E');

//events

d3.select('button')
  .on('click', function() {
    // create random data
    data = [];

    var max_num = Math.random() * 1000;

    for(var x = 0; x < 8; x++) {
      var new_x = Math.floor(Math.random() * max_num);
      var new_y = Math.floor(Math.random() * max_num);

      data.push([new_x, new_y]);
    }

    // update scales
    x_scale.domain([0, d3.max(data, function(d) {
      return d[0];
    })]);

    y_scale.domain([0, d3.max(data, function(d) {
      return d[1];
    })]);

    var colors = ['#F26D6D', '#1E6190', '#7559D9', '#D1AB03'];

    var color_index = Math.floor(Math.random() * colors.length);

    svg.selectAll('circle')
      .data(data)
      .transition()
      .duration(1000)
      .attr('cx', function(d) {
        return x_scale(d[0]);
      })
      .attr('cy', function(d) {
        return y_scale(d[1]);
      })
      .transition()
      .attr('fill', colors[color_index]);

    //update axis
    svg.selectAll('.x-axis')
      .transition()
      .duration(1000)
      .call(x_axis);

    svg.selectAll('.y-axis')
      .transition()
      .duration(1000)
      .call(y_axis);
  });
