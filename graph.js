var drawGraph = function(data,svgName,w,h)
{
  var screen =
  {
    width:w,
    height:h
  }

  var svg = d3.select(svgName)
              .attr("width",screen.width)
              .attr("height",screen.height);

  var margins =
  {
    top: 10,
    bottom: 40,
    left: 80,
    right: 110
  }

  var width = screen.width - margins.left - margins.right;
  //console.log(width);
  var height = screen.height - margins.top - margins.bottom;
  //console.log(height);

   //scales usually go here
  var xScale = d3.scaleLinear()
                 .domain([0,20]) //first test, second test, thrid...
                 .range([0,width]);

  var yScale = d3.scaleLinear()
                 .domain([0,100])
                 .range([height,0]);

  var colors = d3.scaleOrdinal(d3.schemeSet3);

   //plot land
  var plotLand = svg.append("g")
                    .classed("plot",true)
                    .attr("transform","translate("
                          +margins.left+","+margins.top+")");

  var students = plotLand.selectAll("g")
                         .data(data)
                         .enter()
                         .append("g")
                         .attr("fill",function(d) {return colors(d.name)});

  students.selectAll("circle")
          .data(function(d) {return d.grades})
          .enter()
          .append("circle")
          .attr("cx",function(d,i) {return xScale(i)})
          .attr("cy",function(d) {return yScale(d)})
          .attr("r",7)
          .attr("stroke","#1F3641")
          .attr("stroke-width",3)
          .append("title")
          .text(function(d) {return d})

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
                                {return "translate(0,"+(i*30)+")"});

  legendLines.append("circle")
             .attr("cx",40)
             .attr("cy",height-250)
             .attr("r",7)
             .attr("fill",function(d) {return colors(d.name)})
             .attr("stroke","#1F3641")
             .attr("stroke-width",3);

  legendLines.append("text")
             .attr("x",50)
             .attr("y",height-245)
             .text(function(d) {return d.name})
             .attr("fill","white")
             .style("font-size","20")
             .style("font-style","italic");

  //create axis
  var xAxis = d3.axisBottom(xScale);

  svg.append("g")
     .classed("xAxis",true)
     .call(xAxis)
     .attr("transform","translate("
           +(margins.left-width/20)+","+(margins.top+height)+")")
     .attr("color","white")
     .style("font-size","15")
     .style("font-weight","bold");

  var yAxis = d3.axisLeft(yScale);

  svg.append("g")
     .classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("
           +(margins.left-width/20)+",10)")
     .attr("color","white")
     .style("font-size","15")
     .style("font-weight","bold");


}


var gradesP = d3.json("gradeData.json");

var svgs=[
  {
    name:".first",
    width:700,
    height:300
  },
  {
    name:".second",
    width:800,
    height:500
  },
  {
    name:".third",
    width:1000,
    height:400
  },
]

var clicks = 0;

var getInput = function()
{
  var widthInput = document.getElementById("widthInput").value;
  var heightInput = document.getElementById("heightInput").value;

  clicks = clicks + 1;

  var n = clicks.toString();

  d3.select(".newSvgs").append("svg")
    .attr("class","newSvg"+n);

  gradesP.then(function(data)
  {
    drawGraph(data,".newSvg"+n,widthInput,heightInput);
  },
  function(err)
  {
    console.log(err);
  });
}

gradesP.then(function(data)
{
  svgs.forEach(function(d,i)
  {
    drawGraph(data,svgs[i].name,svgs[i].width,svgs[i].height);
  })},
function(err)
{
  console.log(err);
});
