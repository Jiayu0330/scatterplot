var drawGraph = function(data)
{
  var screen =
  {
    width:500,
    height:400
  }

  var svg = d3.select("svg")
              .attr("width",screen.width)
              .attr("height",screen.height);

  var margins =
  {
    top: 10,
    bottom: 40,
    left: 10,
    right: 10
  }

  var width = screen.width - margins.left - margins.right;
  var height = screen.height - margins.top - margins.bottom;

   //scales usually go here
  var xScale = d3.scaleLinear()
                 .domain([0,20]) //first test, second test, thrid...
                 .range([0,width]);

  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([height,0]);

  var colors = d3.scaleOrdinal(d3.schemeAccent);

   //plot land
  var plotLand = svg.append("g")
                    .classed("plot",true);
                    .attr("transform","translate("
                          +margins.left+","margins.top+")");

  var students = plotLand.selectAll("g")
                         .data(data)
                         .enter()
                         .append("g")
                         .attr("fill",function(d) {return colors(d.name)});

  students.selectAll("circle")
          .data(function(d) {return d.grade})
          .enter()
          .append("circle")
          .attr("cx",function(d,i) {return xScale(i)})
          .attr("cy",function(d) {return yScale(d)})
          .attr("r",10);

   //the legend
  var legend = svg.append("g")
                  .classed("legend",true)
                  .attr("transform","translate("+(width+margins.left)+","+margins.right+")");

  var legendLines = legend.selectAll("g")
                          .data(data)
                          .enter()
                          .append("g")
                          .classed("legendLines",true)
                          .attr("transform",function(d,i)
                                {return "translate(0,"+(i*20)+")"});

  legendLines.append("rect")
             .attr("x",0)
             .attr("y",0)
             .attr("width",10)
             .attr("height",10)
             .attr("fill",function(d) {return colors(d.name)}));

  legendLines.append("text")
             .attr("x",20)
             .attr("y",10)
             .text(function(d) {return d.name});

  //create axis
  var xAxis = d3.axisBottom(xScale);

  svg.append("g")
     .classed("xAxis",true)
     .call(xAxis)
     .attr("transform","translate("
           margins.left+","+(margins.top+height+10)+")");

}


var gradesP = d3.json("gradeData.json");

gradesP.then(function(data)
{
  drawGraph(data);
},
function(err)
{
  console.log(err);
})
