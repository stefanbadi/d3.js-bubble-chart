//create element which does not exist in D3. This places data in the waiting room

var data = [
  [400, 200],
  [210, 140],
  [722, 300],
  [70, 160],
  [250, 50],
  [110, 280],
  [699, 225],
  [90, 220]
];

//The vars for chart dimension
var chart_width = 800;
var chart_height = 400;
var padding = 50;

// Create the SVG Element
var svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

// Create Scales
var x_scale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, function(d) {
      return d[0];
    })
  ])
  .range([padding, chart_width - padding * 2]);

var y_scale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, function(d) {
      return d[1];
    })
  ])
  .range([chart_height - padding, padding]);

var r_scale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, function(d) {
      return d[1];
    })
  ])
  .range([5, 30]);

var a_scale = d3
  .scaleSqrt()
  .domain([
    0,
    d3.max(data, function(d) {
      return d[1];
    })
  ])
  .range([0, 25]);

//Create Axis by adding it to the svg and using a group element
var x_axis = d3.axisBottom(x_scale);
svg
  .append('g')
  .attr('class', 'x-axis')
  .attr('transform', 'translate(0, ' + (chart_height - padding) + ')')
  .call(x_axis);

// Create Circles
svg
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
  .attr('r', function(d) {
    return a_scale(d[1]);
  })
  .attr('fill', '#D1AB0E');

// Create Labels
svg
  .append('g')
  .selectAll('text')
  .data(data)
  .enter()
  .append('text')
  .text(function(d) {
    return d.join(',');
  })
  .attr('x', function(d) {
    return x_scale(d[0]);
  })
  .attr('y', function(d) {
    return y_scale(d[1]);
  });
