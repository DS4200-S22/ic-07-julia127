

/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/
// Set dimensions and margins for plots 
//const width3 = 900;
//const height3 = 450;
//const margin3 = { left: 50, right: 50, bottom: 50, top: 50 };
//const yTooltipOffset = 15;

let myBrush;
let myCircles;

// Build your scatterplot in this file 
const svg3 = d3
    .select("#csv-scatter")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);




d3.csv("../data/scatter.csv").then((data) => {
        let x1, y1;
        let xKey1, yKey1;
    
        {
            let xKey1 = "day";
            let yKey1 = "score";
    
            // Find max x
            let maxX1 = d3.max(data, (d) => { return d[xKey1]; });
    
            // Create X scale
            let x1 = d3.scaleLinear()
                .domain([0, maxX1])
                .range([margin.left, width - margin.right]);
    
            // Add x axis 
            svg3.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x1))
                .attr("font-size", '20px')
                .call((g) => g.append("text")
                    .attr("x", width - margin.right)
                    .attr("y", margin.bottom - 4)
                    .attr("fill", "black")
                    .attr("text-anchor", "end")
                    .text(xKey1)
                );
    
            // Finx max y 
            let maxY1 = d3.max(data, (d) => { return d[yKey1]; });
    
            // Create Y scale
            let y1 = d3.scaleLinear()
                .domain([0, maxY1])
                .range([height - margin.bottom, margin.top]);
    
            // Add y axis 
            svg3.append("g")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y1))
                .attr("font-size", '20px')
                .call((g) => g.append("text")
                    .attr("x", 0)
                    .attr("y", margin.top)
                    .attr("fill", "black")
                    .attr("text-anchor", "end")
                    .text(yKey1)
                );
    

            const tooltip3 = d3.select("#csv-scatter")
                .append("div")
                .attr('id', "tooltip3")
                .style("opacity", 0)
                .attr("class", "tooltip");
            
              // adds an event to a data point: when the user hovers above the data, the name and score are displayed.
              // on the bottom of the chart.
              const mouseover3 = function (event, d) {
                tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>")
                  .style("opacity", 1);
              }
            
              // adds an event to a data point: when the user moves the mouse, the name and score for the next one
              // is displayed or nothing is displayed
              const mousemove3 = function (event, d) {
                tooltip3.style("left", (event.x) + "px")
                  .style("top", (event.y + yTooltipOffset) + "px");
              }
            
              // adds a event to a data point: when the user moves the mouse away from the chart,
              // the text becomes invisible
              const mouseleave3 = function (event, d) {
                tooltip3.style("opacity", 0);
              }
            
            
            // Add points
            const myCircles = svg3.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "circle") 
                .attr("day", (d) => d.day)
                .attr("cx", (d) => x1(d[xKey1]))
                .attr("cy", (d) => y1(d[yKey1]))
                .attr("r", 8)
                .style("opacity", 1)
                .on("mouseover", mouseover3)
                .on("mousemove", mousemove3)
                .on("mouseleave", mouseleave3);;
            }

});
