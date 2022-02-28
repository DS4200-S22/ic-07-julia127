/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900;
const height = 450;
const margin = { left: 50, right: 50, bottom: 50, top: 50 };
const yTooltipOffset = 15;


// Select the html div element with a clasname: hard-coded-bar
// Appends a svg element into that div
// Sets the width, height, and viewBox of the svg element
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  { name: 'A', score: 92 },
  { name: 'B', score: 15 },
  { name: 'C', score: 67 },
  { name: 'D', score: 89 },
  { name: 'E', score: 53 },
  { name: 'F', score: 91 },
  { name: 'G', score: 18 }
];

/*

  Axes

*/


// Returns the max score from data 1.
let maxY1 = d3.max(data1, function (d) { return d.score; });

// Scales the Y-Axis of the graph to accommodate to the highest data point.
let yScale1 = d3.scaleLinear()
  .domain([0, maxY1]) // Defines the y domain range
  .range([height - margin.bottom, margin.top]); // Defines the visual y range

// Scales the X-Axis of the graph to accommodate to the highest data point.
let xScale1 = d3.scaleBand()
  .domain(d3.range(data1.length)) // Defines the x domain range
  .range([margin.left, width - margin.right]) // Defines the visual y range
  .padding(0.1);


// Appends the Y-Axis of the graph to the SVG
svg1.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(yScale1))
  .attr("font-size", '20px');

// Appends the X-axist of the graph to the SVG
svg1.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(xScale1)
    .tickFormat(i => data1[i].name))
  .attr("font-size", '20px');

/* 

  Tooltip Set-up  

*/

// Appends another div to the div element with a classname: hard-coded-bar
// Sets the attribute and styles of the newly created div.
const tooltip1 = d3.select("#hard-coded-bar")
  .append("div") // append a div for showing tool tip
  .attr('id', "tooltip1") // set the id to tooltip1
  .style("opacity", 0) // set the opacity to 0
  .attr("class", "tooltip"); //  set the class to tooltip

// adds an event to a data point: when the user hovers above the data, the name and score are displayed.
// on the bottom of the chart.
const mouseover1 = function (event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // Set the html content of the tooltip
    .style("opacity", 1);
}

// adds an event to a data point: adds the left and top values to the tooltip that moves with the mouse
const mousemove1 = function (event, d) {
  tooltip1
    .style("left", (event.x) + "px") // Set the new x position for the tooltip
    .style("top", (event.y + yTooltipOffset) + "px"); // Set the new y position for the tooltip
}

// adds a event to a data point: when the user moves the mouse away from the chart, the opacity
// of the tooltip is set back to 0
const mouseleave1 = function (event, d) {
  tooltip1.style("opacity", 0);
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
// adds the bars to the graph
svg1.selectAll(".bar")
  .data(data1) // Data binding
  .enter() // Create a placeholder for the new bar
  .append("rect") // Appends a rect svg to each placeholder
  .attr("class", "bar") // Set the bar class to "bar"
  .attr("x", (d, i) => xScale1(i)) // scales the x position of the rectangles
  .attr("y", (d) => yScale1(d.score)) // scales the y position of the rectangles
  .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
  .attr("width", xScale1.bandwidth())
  .on("mouseover", mouseover1)
  .on("mousemove", mousemove1)
  .on("mouseleave", mouseleave1);



/*
    Bar chart with data from CSV
*/

let myBrush2;
let myBars2;

// Build your scatterplot in this file 
const svg2 = d3
    .select("#csv-bar")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);




d3.csv("../data/barchart.csv").then((data) => {
        let x2, y2;
        let xKey2, yKey2;
    
        {
            let xKey2 = "name";
            let yKey2 = "score";
    
            // Find max x
            let maxX2 = d3.max(data, (d) => { return d[xKey1]; });
    
            // Create X scale
            let x2 = d3.scaleLinear()
                .domain([0, maxX2])
                .range([margin.left, width - margin.right]);
    
            // Add x axis 
            svg2.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x1))
                .attr("font-size", '20px')
                .call((g) => g.append("text")
                    .attr("x", width - margin.right)
                    .attr("y", margin.bottom - 4)
                    .attr("fill", "black")
                    .attr("text-anchor", "end")
                    .text(xKey2)
                );
    
            // Finx max y 
            let maxY2 = d3.max(data, (d) => { return d[yKey2]; });
    
            // Create Y scale
            let y2 = d3.scaleLinear()
                .domain([0, maxY2])
                .range([height - margin.bottom, margin.top]);
    
            // Add y axis 
            svg2.append("g")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y2))
                .attr("font-size", '20px')
                .call((g) => g.append("text")
                    .attr("x", 0)
                    .attr("y", margin.top)
                    .attr("fill", "black")
                    .attr("text-anchor", "end")
                    .text(yKey1)
                );
    

            const tooltip2 = d3.select("#csv-bar")
                .append("div")
                .attr('id', "tooltip2")
                .style("opacity", 0)
                .attr("class", "tooltip");
            
              // adds an event to a data point: when the user hovers above the data, the name and score are displayed.
              // on the bottom of the chart.
              const mouseover2 = function (event, d) {
                tooltip2.html("Name: " + d.nqme + "<br> Score: " + d.score + "<br>")
                  .style("opacity", 1);
              }
            
              // adds an event to a data point: when the user moves the mouse, the name and score for the next one
              // is displayed or nothing is displayed
              const mousemove2 = function (event, d) {
                tooltip2.style("left", (event.x) + "px")
                  .style("top", (event.y + yTooltipOffset) + "px");
              }
            
              // adds a event to a data point: when the user moves the mouse away from the chart,
              // the text becomes invisible
              const mouseleave2 = function (event, d) {
                tooltip2.style("opacity", 0);
              }
            
            
            // Add points

            const myBars2 = svg2.selectAll(".bar")
                .data(data) // Data binding
                .enter() // Create a placeholder for the new bar
                .append("rect") // Appends a rect svg to each placeholder
                .attr("class", "bar") // Set the bar class to "bar"
                .attr("x", (d, i) => xScale2(i)) // scales the x position of the rectangles
                .attr("y", (d) => yScale2(d.score)) // scales the y position of the rectangles
                .attr("height", (d) => (height - margin.bottom) - yScale2(d.score))
                .attr("width", xScale2.bandwidth())
                .on("mouseover", mouseover2)
                .on("mousemove", mousemove2)
                .on("mouseleave", mouseleave2);
              
            }

});


