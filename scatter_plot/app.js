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

//create SVG element
var svg = d3.select('#chart')
      .append('svg')
      .attr('height', chart_height)
      .attr('width', chart_width);

//create circles
svg.selectAll('circle')
   .data(data)
   .enter()
   .append('circle')
   .attr('cx', function(d) {
     return d[0];
   })
   .attr('cy', function(d) {
     return d[1];
   })
   .attr('r', function(d) {
     return d[1] / 10;
   })
   .attr('fill', '#D1AB0E');

//create labels
svg.selectAll('text')
   .data(data)
   .enter()
   .append('text')
   .text(function(d) {
     return d.join(',');
   })
   .attr('x', function(d) {
     return d[0];
   })
   .attr('y', function(d) {
     return d[1];
   });
